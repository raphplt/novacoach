import { UserType } from "type/user";

export function getLastValueFromUserDetails(user: UserType) {
    if (user.userDetails) {
        // Parcourt chaque clé de userDetails pour vérifier si c'est un tableau d'objets avec une propriété date
        Object.keys(user.userDetails).forEach((key) => {
            const detailArray = (user.userDetails as any)[key];

            // Vérifie si la propriété est un tableau d'objets ayant une date
            if (Array.isArray(detailArray) && detailArray.every((item: any) => item.date)) {
                // Trie le tableau par date (du plus récent au plus ancien)
                detailArray.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
            }
        });
    }

    return user;
};



