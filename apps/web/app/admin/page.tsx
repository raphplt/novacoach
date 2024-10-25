"use client";
import { useState, ChangeEvent } from 'react';
import { Table, Button, Modal, Input, Pagination, TableHeader, TableColumn, TableBody, TableRow, TableCell, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react';

// Données initiales
const initialCoaches = [
  { id: 1, description: 'Coach A', structure: { id: 1, name: 'Structure 1' } },
  { id: 2, description: 'Coach B', structure: { id: 2, name: 'Structure 2' } }
];

const initialStructures = [
  { id: 1, name: 'Structure 1', address: 'Address 1', phone: '123456' },
  { id: 2, name: 'Structure 2', address: 'Address 2', phone: '789012' }
];

export default function AdminPage() {
  // États pour chaque tableau
  const [coaches, setCoaches] = useState(initialCoaches);
  const [structures, setStructures] = useState(initialStructures);
  const [searchQuery, setSearchQuery] = useState<string>(''); // État pour la recherche
  const [currentPage, setCurrentPage] = useState(1); // État pour la pagination
  const itemsPerPage = 2; // Nombre d'éléments par page

  // Tri des colonnes
  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Modal d'ajout/édition
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEntity, setEditingEntity] = useState<any>(null);
  const [entityType, setEntityType] = useState<string>('');

  // Gestion de la recherche
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredCoaches = coaches.filter(coach =>
    coach.description.toLowerCase().includes(searchQuery)
  );

  const filteredStructures = structures.filter(structure =>
    structure.name.toLowerCase().includes(searchQuery)
  );

// Gestion du tri
const handleSort = (column: string) => {
	const direction = sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc';
	setSortColumn(column);
	setSortDirection(direction);
  
	if (entityType === 'coach') {
	  const sortedCoaches = [...filteredCoaches].sort((a, b) => {
		const coachA = a as { id: number; description: string; structure: { id: number; name: string; } };
		const coachB = b as { id: number; description: string; structure: { id: number; name: string; } };
  
		if (column === 'id') {
		  return direction === 'asc' ? coachA.id - coachB.id : coachB.id - coachA.id;
		} else if (column === 'description') {
		  return direction === 'asc' ? coachA.description.localeCompare(coachB.description) : coachB.description.localeCompare(coachA.description);
		}
		return 0;
	  });
  
	  // Mise à jour des coachs triés
	  setCoaches(sortedCoaches);
	} else if (entityType === 'structure') {
	  const sortedStructures = [...filteredStructures].sort((a, b) => {
		const structureA = a as { id: number; name: string; address: string; phone: string };
		const structureB = b as { id: number; name: string; address: string; phone: string };
  
		if (column === 'id') {
		  return direction === 'asc' ? structureA.id - structureB.id : structureB.id - structureA.id;
		} else if (column === 'name') {
		  return direction === 'asc' ? structureA.name.localeCompare(structureB.name) : structureB.name.localeCompare(structureA.name);
		}
		return 0;
	  });
  
	  // Mise à jour des structures triées
	  setStructures(sortedStructures);
	}
  };
  
  // Gestion de la pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedCoaches = filteredCoaches.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const paginatedStructures = filteredStructures.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Ouvrir le modal
  const openModal = (type: 'coach' | 'structure', entity: any = null) => {
    setEntityType(type);
    setEditingEntity(entity);
    setIsModalOpen(true);
  };

  // Fermer le modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingEntity(null);
  };

  // Fonction pour supprimer un coach ou une structure
const handleDelete = (type: 'coach' | 'structure', id: number) => {
	if (type === 'coach') {
	  // Supprimer un coach en filtrant le tableau des coachs
	  setCoaches(coaches.filter((coach) => coach.id !== id));
	} else if (type === 'structure') {
	  // Supprimer une structure en filtrant le tableau des structures
	  setStructures(structures.filter((structure) => structure.id !== id));
	}
  };
  

  // Sauvegarder ou éditer une entité
  const handleSave = () => {
    if (editingEntity) {
      if (entityType === 'coach') {
        setCoaches(
          coaches.map(coach =>
            coach.id === editingEntity.id ? editingEntity : coach
          )
        );
      } else if (entityType === 'structure') {
        setStructures(
          structures.map(structure =>
            structure.id === editingEntity.id ? editingEntity : structure
          )
        );
      }
    } else {
      const newId =
        entityType === 'coach'
          ? coaches.length + 1
          : structures.length + 1;

      if (entityType === 'coach') {
        setCoaches([...coaches, { id: newId, ...editingEntity, structure: initialStructures.find(s => s.id === editingEntity.structure.id) }]);
      } else if (entityType === 'structure') {
        setStructures([...structures, { id: newId, ...editingEntity }]);
      }
    }
    closeModal();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestion des Coachs et Structures</h1>

      {/* Barre de recherche */}
      <Input
        placeholder="Rechercher..."
        value={searchQuery}
        onChange={handleSearch}
        style={{ marginBottom: '1rem' }}
      />

      {/* Tableau pour les Coachs */}
      <h2 className="text-xl font-semibold mb-2">Coach</h2>
      <Table
        aria-label="Table des Coachs"
        style={{ height: 'auto', minWidth: '100%' }}
      >
        <TableHeader>
          <TableColumn onClick={() => handleSort('id')}>ID</TableColumn>
          <TableColumn onClick={() => handleSort('description')}>Description</TableColumn>
          <TableColumn>Structure</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {paginatedCoaches.map((coach) => (
            <TableRow key={coach.id}>
              <TableCell>{coach.id}</TableCell>
              <TableCell>{coach.description}</TableCell>
              <TableCell>{coach.structure?.name || "Aucune Structure"}</TableCell>
              <TableCell>
                <Button onClick={() => openModal('coach', coach)}>Éditer</Button>
                <Button color="warning" onClick={() => handleDelete('coach', coach.id)}>Supprimer</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination pour les coachs */}
      <Pagination total={Math.ceil(filteredCoaches.length / itemsPerPage)} page={currentPage} onChange={handlePageChange} />

      <Button className="mt-2" onClick={() => openModal('coach')}>Ajouter un Coach</Button>

      {/* Tableau pour les Structures */}
      <h2 className="text-xl font-semibold mt-8 mb-2">Structure</h2>
      <Table
        aria-label="Table des Structures"
        style={{ height: 'auto', minWidth: '100%' }}
      >
        <TableHeader>
          <TableColumn onClick={() => handleSort('id')}>ID</TableColumn>
          <TableColumn onClick={() => handleSort('name')}>Nom</TableColumn>
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
                <Button onClick={() => openModal('structure', structure)}>Éditer</Button>
                <Button color="warning" onClick={() => handleDelete('structure', structure.id)}>Supprimer</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination pour les structures */}
      <Pagination total={Math.ceil(filteredStructures.length / itemsPerPage)} page={currentPage} onChange={handlePageChange} />

      <Button className="mt-2" onClick={() => openModal('structure')}>Ajouter une Structure</Button>
      {/* Modal pour Ajouter / Éditer */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
      >
        <ModalHeader>
          <h2>{editingEntity ? 'Éditer' : 'Ajouter'} {entityType === 'coach' ? 'Coach' : 'Structure'}</h2>
        </ModalHeader>
        <ModalBody>
          {entityType === 'coach' && (
            <>
              <Input
                label="Description"
                placeholder="Description"
                value={editingEntity?.description || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEditingEntity({ ...editingEntity, description: e.target.value })
                }
              />
              <Input
                label="Structure ID"
                placeholder="Structure ID"
                value={editingEntity?.structure?.id || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEditingEntity({ ...editingEntity, structure: { ...editingEntity.structure, id: parseInt(e.target.value) } })
                }
              />
            </>
          )}

          {entityType === 'structure' && (
            <>
              <Input
                label="Nom"
                placeholder="Nom"
                value={editingEntity?.name || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEditingEntity({ ...editingEntity, name: e.target.value })
                }
              />
              <Input
                label="Adresse"
                placeholder="Adresse"
                value={editingEntity?.address || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEditingEntity({ ...editingEntity, address: e.target.value })
                }
              />
              <Input
                label="Téléphone"
                placeholder="Téléphone"
                value={editingEntity?.phone || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEditingEntity({ ...editingEntity, phone: e.target.value })
                }
              />
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button  color="warning" onClick={closeModal}>
            Annuler
          </Button>
          <Button  onClick={handleSave}>
            Sauvegarder
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
