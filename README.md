Product Listing App
A React-based web application for browsing products with search, pagination, and product details functionality. Built using React, Redux, React Router, and Bootstrap.

Features
Product Listing:

View a list of products with pagination.

Display 10 products per page.

Search:

Search for products by title.

Product Details:

Click on a product to view its details (title, description, price, and image).

Pagination:

Navigate between pages using a pagination component.

Error Handling:

Display error messages if the API request fails.

Responsive Design:

Built with Bootstrap for a mobile-friendly UI.

Technologies Used
React: Frontend library for building user interfaces.

Redux: State management for managing application data.

React Router: Routing for navigation between pages.

Axios: HTTP client for making API requests.

Bootstrap: CSS framework for styling.

Lodash: Utility library for debouncing search input.

Setup Instructions
Prerequisites
Node.js (v16 or higher)

npm (v8 or higher)

Steps to Run the Project
Clone the Repository:

bash
Copy
git clone https://github.com/your-username/product-listing-app.git
cd product-listing-app
Install Dependencies:

bash
Copy
npm install
Start the Development Server:

bash
Copy
npm start
Open the App:

Visit http://localhost:3000 in your browser.

Project Structure
Copy
product-listing-app/
├── public/
├── src/
│ ├── components/
│ │ ├── LoadingSpinner.js
│ │ ├── Pagination.js
│ │ ├── ProductDetails.js
│ │ ├── ProductsList.js
│ ├── features/
│ │ ├── productSlice.js
│ ├── store/
│ │ ├── store.js
│ ├── App.js
│ ├── main.jsx
│ ├── index.css
├── package.json
├── README.md
API Used
FakeStore API:

Base URL: https://fakestoreapi.com

Endpoint: /products

Parameters:

\_page: Page number.

\_limit: Number of items per page.

title: Search term for filtering products by title.

Screenshots
Product Listing Page
Product Listing Page

Product Details Page
Product Details Page

Contributing
Contributions are welcome! Follow these steps:

Fork the repository.

Create a new branch:

bash
Copy
git checkout -b feature/your-feature-name
Commit your changes:

bash
Copy
git commit -m "Add your feature"
Push to the branch:

bash
Copy
git push origin feature/your-feature-name
Open a pull request.

License
This project is licensed under the MIT License. See the LICENSE file for details.

Contact
For questions or feedback, feel free to reach out:

Email: your-email@example.com

GitHub: your-username

Enjoy using the Product Listing App! 🚀
