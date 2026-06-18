# Real Estate

This project is a real estate listing platform composed of a Django backend and a React frontend.

The backend provides a REST API for managing property listings, real estate agents, and user accounts. It includes models, serializers, views, and authentication logic to support listing creation, search, and user management.

The frontend is built with React and Vite, offering a responsive interface for browsing properties, viewing listing details, and interacting with map-based location data. It integrates with the backend API to display and fetch listing data dynamically.

## Project Structure

- `backend/`: Django application containing the API, models, and user management.
- `frontend/`: React/Vite application used for the public-facing user interface.
- `nginx_realestate/`: Nginx configuration intended for deployment.
- `docker-compose.dev.yaml` / `docker-compose.prod.yaml`: Docker Compose definitions for development and production setups.
