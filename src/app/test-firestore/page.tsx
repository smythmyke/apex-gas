'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function TestFirestore() {
  const [status, setStatus] = useState('Testing Firestore connection...');
  const [posts, setPosts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      // Try to read from blogPosts collection
      const querySnapshot = await getDocs(collection(db, 'blogPosts'));
      const docs: any[] = [];
      querySnapshot.forEach((doc) => {
        docs.push({ id: doc.id, ...doc.data() });
      });
      
      setPosts(docs);
      setStatus(`Successfully connected! Found ${docs.length} blog posts.`);
    } catch (err: any) {
      console.error('Firestore error:', err);
      setError(err.message);
      setStatus('Error connecting to Firestore');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Firestore Connection Test</h1>
      <p className="mb-4">{status}</p>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Error:</strong> {error}
        </div>
      )}
      {posts.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Found Posts:</h2>
          <ul className="list-disc pl-5">
            {posts.map((post) => (
              <li key={post.id}>
                {post.title} - Status: {post.status}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}