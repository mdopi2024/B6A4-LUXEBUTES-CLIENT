# LuxeBites 🍱
**"Discover & Order Delicious Meals"**

---
Live Link : https://b6-a4-frontend-client.vercel.app
---

## **Project Overview**
LuxeBites is a **full-stack meal ordering platform** where:

- **Customers** browse meals, place orders, track deliveries, and leave reviews  
- **Providers** manage menus and fulfill orders  
- **Admins** oversee users, orders, and categories  

**Tech Stack:** React, Tailwind CSS, Axios, Node.js, Express, PostgreSQL, Prisma, JWT  

---

## **Roles & Permissions**
| Role | Key Actions |
|------|------------|
| **Customer** | Browse & order meals, track orders, leave reviews |
| **Provider** | Add/edit meals, manage incoming orders |
| **Admin** | Manage users, orders, and categories |

> 💡 *Users select their role during registration. Admin accounts should be seeded in the database.*

---

## **Key Features**
- Browse meals & providers with filters (cuisine, price, dietary preference)  
- Add meals to cart & checkout (Cash on Delivery)  
- Track order status in real-time  
- Leave reviews for meals  
- Role-based dashboards for Customers, Providers, and Admins  

---

## **Pages & Routes**

### Public
| Route | Description |
|-------|------------|
| `/` | Home – hero, categories, featured meals |
| `/meals` | Browse meals with filters |
| `/meals/:id` | Meal details, add to cart |
| `/providers/:id` | Provider menu & info |
| `/login` | Login page |
| `/register` | Registration page |

### Customer (Private)
| Route | Description |
|-------|------------|
| `/cart` | View cart |
| `/checkout` | Checkout & delivery address |
| `/orders` | Order history |
| `/orders/:id` | Order details |
| `/profile` | Edit profile |

### Provider (Private)
| Route | Description |
|-------|------------|
| `/provider/dashboard` | Dashboard & stats |
| `/provider/menu` | Manage menu items |
| `/provider/orders` | Update order status |

### Admin (Private)
| Route | Description |
|-------|------------|
| `/admin` | Dashboard & stats |
| `/admin/user` | Manage users |
| `/admin/order` | Manage all orders |
| `/admin/categories` | Manage categories |

---

## **Customer Journey**
1. Register
2. Browse Meals
3. Add to Cart
4. Checkout
5. Track Order

---

## **Provider Journey**
1. Register
2. Add Menu Items
3. View Orders
4. Update Order Status

---

## **Order Status Flow**
- **PLACED** → **PREPARING** → **READY** → **DELIVERED**  
           \
            → **CANCELLED** (by customer)

---

## **Setup Instructions**

### Backend
```bash
git clone https://github.com/mdopi2024/B6A4-LUXEBUTE--SERVER
cd B6A4-LUXEBUTE--SERVER
npm install
# Configure .env file with database and JWT settings
npx prisma migrate dev --name init
npm run dev