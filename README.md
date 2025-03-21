# BookItzz

<div align="center">

  <h3>Modern Library Management System</h3>
  <p>A full-stack solution for institutions to manage their book collections and borrowing processes.</p>

  <div>
    <img src="https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
    <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
    <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" alt="Redis" />
  </div>
</div>

## 🌟 Features

- **📚 Book Management**: Comprehensive catalog with details, availability tracking, and categories
- **👥 User Accounts**: Secure authentication with admin and member roles
- **📱 Responsive Design**: Built with shadcn/ui components for a modern, mobile-friendly interface
- **⚡ Rate Limiting**: Redis-powered protection against API abuse
- **🖼️ Image Management**: Book cover uploads with ImageKit integration
- **🔍 Advanced Search**: Find books by title, author, category, and availability
- **📊 Admin Dashboard**: Monitor library activity, user statistics, and manage the collection
- **📱 API Access**: Well-documented REST API endpoints with authentication

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn
- PostgreSQL database (Neon)
- Redis instance
- ImageKit account

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/your-username/bookitzz.git
   cd bookitzz
   ```

2. Install NPM packages
   ```sh
   npm install
   # or
   yarn install
   ```

3. Set up environment variables by creating a `.env.local` file with:
   ```
   # Database
   DATABASE_URL="postgresql://user:password@your-neon-db-url/bookitzz"
   
   # Redis for Rate Limiting
   REDIS_URL="redis://username:password@your-redis-url:6379"
   REDIS_SECRET="your-redis-secret"
   
   # Authentication
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-nextauth-secret"
   
   # ImageKit for image uploads
   IMAGEKIT_PUBLIC_KEY="your-imagekit-public-key"
   IMAGEKIT_PRIVATE_KEY="your-imagekit-private-key"
   IMAGEKIT_URL_ENDPOINT="https://ik.imagekit.io/your-endpoint"
   
   # Rate Limiting
   RATE_LIMIT_REQUESTS=100
   RATE_LIMIT_WINDOW_MS=600000
   ```

4. Set up the database
   ```sh
   npm run db:migrate
   npm run db:seed
   ```

5. Start the development server
   ```sh
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) to view the application

## 📝 Project Structure

```
bookitzz/
├── app/                 # Next.js app directory
│   ├── admin/          # Admin dashboard pages
│   ├── api/            # API routes
│   ├── auth/           # Authentication pages
│   ├── books/          # Book-related pages
├── components/          # Reusable UI components
│   ├── ui/             # shadcn UI components
│   ├── books/          # Book-specific components
├── lib/                 # Utility functions and shared code
│   ├── db/             # Database configuration
│   ├── auth/           # Authentication helpers
│   ├── rate-limit/     # Rate limiting implementation
│   ├── imagekit/       # ImageKit integration
├── prisma/              # Prisma ORM configuration and schema
├── public/              # Static assets
```


## 🔒 Rate Limiting

BookItzz uses Redis to implement rate limiting to prevent API abuse:

```typescript
// lib/rate-limit/index.ts
import { Redis } from 'ioredis';
import { NextRequest, NextResponse } from 'next/server';

const redis = new Redis(process.env.REDIS_URL as string);

export async function rateLimit(
  req: NextRequest,
  identifier: string = 'ip'
) {
  const ip = req.ip || 'anonymous';
  const id = identifier === 'ip' ? ip : identifier;
  const key = `rate-limit:${id}`;
  
  const requests = await redis.incr(key);
  
  if (requests === 1) {
    await redis.expire(key, parseInt(process.env.RATE_LIMIT_WINDOW_MS as string) / 1000);
  }
  
  const maxRequests = parseInt(process.env.RATE_LIMIT_REQUESTS as string);
  
  if (requests > maxRequests) {
    return NextResponse.json(
      { error: 'Too many requests, please try again later.' },
      { status: 429 }
    );
  }
  
  return null;
}
```

## 📸 Image Upload

BookItzz uses ImageKit for efficient book cover image management:

```typescript
// lib/imagekit/index.ts
import ImageKit from 'imagekit';

export const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT as string,
});

export async function uploadImage(file: File, fileName: string) {
  try {
    const buffer = await file.arrayBuffer();
    const result = await imagekit.upload({
      file: Buffer.from(buffer),
      fileName: fileName,
      folder: '/book-covers',
    });
    
    return result.url;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Failed to upload image');
  }
}
```

## 📱 Screenshots!
![Screenshot from 2025-03-22 00-05-03](https://github.com/user-attachments/assets/f8659476-1a10-4129-ab95-f5907e6439ac)

![Screenshot from 2025-03-22 00-05-12](https://github.com/user-attachments/assets/1a5cc3c6-a84c-4141-9c31-12bb1058c7d6)
![Screenshot from 2025-03-21 23-13-54](https://github.com/user-attachments/assets/59a2f67e-d7cc-4ff2-b009-8c6612c2087d)
![Screenshot from 2025-03-21 23-14-14](https://github.com/user-attachments/assets/b22c89d8-44a5-43b5-9f39-674f32f148ac)
![Screenshot from 2025-03-22 00-00-13](https://github.com/user-attachments/assets/4d67332f-5a7a-4540-b4aa-6329e3315c12)
![Screenshot from 2025-03-22 00-00-22](https://github.com/user-attachments/assets/8fd08747-6f83-485e-a873-240285235f20)


## 🚢 Deployment

Deploy on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Fbookitzz)

Make sure to configure all environment variables on the Vercel dashboard.

## 🤝 Contributing

Contributions are welcome!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 👏 Acknowledgments

* [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
* [Next.js](https://nextjs.org/) for the React framework
* [Neon](https://neon.tech/) for the serverless PostgreSQL database
* [ImageKit](https://imagekit.io/) for image processing
* [Redis](https://redis.io/) for rate limiting functionality


---

<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/your-username">your-username</a></sub>
</div>
