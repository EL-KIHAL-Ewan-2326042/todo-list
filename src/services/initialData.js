export const initialData = {
    "taches": [
        {
            "id": 101,
            "title": "1. Fonctionnalités",
            "description": "",
            "date_creation": "01/01/2025",
            "date_echeance": "01/03/2025",
            "done": true,
            "urgent": false,
            "contacts": [
                {
                    "name": "Paul"
                }
            ]
        },
        {
            "id": 102,
            "title": "2. Etude de marché",
            "description": "",
            "date_creation": "01/01/2025",
            "date_echeance": "01/03/2025",
            "done": true,
            "urgent": true,
            "contacts": []
        },
        {
            "id": 103,
            "title": "3. Wireframes",
            "description": "",
            "date_creation": "01/01/2025",
            "date_echeance": "13/03/2025",
            "done": false,
            "urgent": true,
            "contacts": []
        },
        {
            "id": 104,
            "title": "4. Design",
            "description": "",
            "date_creation": "01/01/2025",
            "date_echeance": "18/03/2025",
            "done": false,
            "urgent": false,
            "contacts": []
        },
        {
            "id": 105,
            "title": "5. Landing Page",
            "description": "",
            "date_creation": "05/01/2025",
            "date_echeance": "13/03/2025",
            "done": false,
            "urgent": false,
            "contacts": []
        },
        {
            "id": 106,
            "title": "6. Développement",
            "description": "",
            "date_creation": "05/01/2025",
            "date_echeance": "28/03/2025",
            "done": false,
            "urgent": false,
            "contacts": []
        },
        {
            "id": 107,
            "title": "7. Publication / Déploiement",
            "description": "",
            "date_creation": "06/01/2025",
            "date_echeance": "28/03/2025",
            "done": false,
            "urgent": true,
            "contacts": [
                {
                    "name": "MyStore"
                },
                {
                    "name": "Bob"
                }
            ]
        },
        {
            "id": 108,
            "title": "8. Marketing",
            "description": "",
            "date_creation": "10/01/2025",
            "date_echeance": "01/04/2025",
            "done": false,
            "urgent": false,
            "contacts": []
        },
        {
            "id": 109,
            "title": "9. Feedbacks",
            "description": "",
            "date_creation": "10/01/2025",
            "date_echeance": "01/04/2025",
            "done": false,
            "urgent": false,
            "contacts": []
        }
    ],
    "categories": [
        {
            "id": 201,
            "title": "Marketing",
            "description": "",
            "color": "orange",
            "icon": ""
        },
        {
            "id": 202,
            "title": "Dev",
            "description": "",
            "color": "pink",
            "icon": ""
        },
        {
            "id": 203,
            "title": "Autre",
            "description": "",
            "color": "bluesky",
            "icon": ""
        }
    ],
    "relations": [
        {
            "tache": 102,
            "categorie": 201
        },
        {
            "tache": 108,
            "categorie": 201
        },
        {
            "tache": 109,
            "categorie": 203
        },
        {
            "tache": 105,
            "categorie": 202
        },
        {
            "tache": 106,
            "categorie": 202
        }
    ]
};