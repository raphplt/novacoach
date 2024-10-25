"use client";
import { useState, useEffect, ChangeEvent } from 'react';
import { Table, Button, Modal, Input, Pagination, TableHeader, TableColumn, TableBody, TableRow, TableCell, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react';
import AdminNavigation from '../adminNavigation/AdminNavigation';

// Types
type Structure = {
  id: number;
  name: string;
  address: string;
  phone: string;
};

export default function StructuresPage() {
  const [structures, setStructures] = useState<Structure[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>(''); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [editingStructure, setEditingStructure] = useState<Partial<Structure> | null>(null);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 5; 
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Fonction pour récupérer les structures depuis l'API
  const fetchStructures = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${apiUrl}/structures`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la récupération des structures');
      }
      setStructures(data);
      setTotal(data.length);
      setIsLoading(false);
    } catch (error: any) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStructures();
  }, []);

  // Gestion de la recherche
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredStructures = structures.filter(structure =>
    structure.name.toLowerCase().includes(searchQuery)
  );

  // Gestion de la pagination
  const paginatedStructures = filteredStructures.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Ouvrir le modal pour ajouter/éditer
  const openModal = (structure: Structure | null = null) => {
    setEditingStructure(structure);
    setIsModalOpen(true);
  };

  // Fermer le modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingStructure(null);
  };

  // Supprimer une structure
  const handleDelete = async (id: number) => {
    try {
      await fetch(`${apiUrl}/structures/${id}`, {
        method: 'DELETE',
      });
      fetchStructures(); // Rafraîchir après suppression
    } catch (error) {
      console.error('Erreur lors de la suppression de la structure', error);
    }
  };

  // Sauvegarder les modifications ou ajouter une structure
  const handleSave = async () => {
    if (!editingStructure) return;

    try {
      if (editingStructure.id) {
        // Mise à jour d'une structure existante
        await fetch(`${apiUrl}/structures/${editingStructure.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editingStructure),
        });
      } else {
        // Ajouter une nouvelle structure
        await fetch(`${apiUrl}/structures`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editingStructure),
        });
      }
      fetchStructures(); // Rafraîchir après sauvegarde
      closeModal();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la structure', error);
    }
  };

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error}</div>;

  return (
    <div>
      <AdminNavigation />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Gestion des Structures</h1>

        {/* Barre de recherche */}
        <Input
          placeholder="Rechercher une structure..."
          value={searchQuery}
          onChange={handleSearch}
          style={{ marginBottom: '1rem' }}
        />

        {/* Tableau des Structures */}
        <Table aria-label="Table des Structures" style={{ height: 'auto', minWidth: '100%' }}>
          <TableHeader>
            <TableColumn>ID</TableColumn>
            <TableColumn>Nom</TableColumn>
            <TableColumn>Adresse</TableColumn>
            <TableColumn>Téléphone</TableColumn>
            <TableColumn>Actions</TableColumn>
          </TableHeader>
          <TableBody>
            {paginatedStructures.map((structure) => (
              <TableRow key={structure.id}>
                <TableCell>{structure.id}</TableCell>
                <TableCell>{structure.name}</TableCell>
                <TableCell>{structure.address}</TableCell>
                <TableCell>{structure.phone}</TableCell>
                <TableCell>
                  <Button onClick={() => openModal(structure)}>Éditer</Button>
                  <Button color="warning" onClick={() => handleDelete(structure.id)}>Supprimer</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <Pagination
          total={Math.ceil(filteredStructures.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
        />

        {/* Bouton pour ajouter une structure */}
        <Button className="mt-2" onClick={() => openModal()}>
          Ajouter une Structure
        </Button>

        {/* Modal pour Ajouter / Éditer */}
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ModalHeader>{editingStructure ? 'Éditer' : 'Ajouter'} Structure</ModalHeader>
          <ModalBody>
            <Input
              label="Nom"
              placeholder="Nom"
              value={editingStructure?.name || ''}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEditingStructure((prev) => ({ ...prev, name: e.target.value }))
              }
            />
            <Input
              label="Adresse"
              placeholder="Adresse"
              value={editingStructure?.address || ''}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEditingStructure((prev) => ({ ...prev, address: e.target.value }))
              }
            />
            <Input
              label="Téléphone"
              placeholder="Téléphone"
              value={editingStructure?.phone || ''}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEditingStructure((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
          </ModalBody>
          <ModalFooter>
            <Button color="warning" onClick={closeModal}>Annuler</Button>
            <Button onClick={handleSave}>Sauvegarder</Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
}
