'use client';

import { useEffect, useState, use } from 'react';
import { collection, query, where, getDocs, updateDoc, doc, increment } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { BlogPost } from '@/types/blog';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { marked } from 'marked';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = use(params);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    try {
      const q = query(
        collection(db, 'blogPosts'),
        where('slug', '==', slug),
        where('status', '==', 'published')
      );
      
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        notFound();
        return;
      }
      
      const docData = querySnapshot.docs[0];
      const postData = { id: docData.id, ...docData.data() } as BlogPost;
      setPost(postData);
      
      // Convert markdown to HTML
      const markdownContent = postData.markdownContent || postData.content;
      
      // Configure marked for better rendering
      marked.setOptions({
        gfm: true,
        breaks: true,
        headerIds: false,
        mangle: false
      });
      
      const html = await marked.parse(markdownContent);
      setHtmlContent(html);
      
      // Increment view count
      await updateDoc(doc(db, 'blogPosts', docData.id), {
        views: increment(1)
      });
      
    } catch (error) {
      console.error('Error fetching post:', error);
      notFound();
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCategory = (category: string) => {
    return category.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!post) {
    return notFound();
  }

  return (
    <article className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-96 w-full">
        <Image
          src={post.featuredImage?.url || 'https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg'}
          alt={post.featuredImage?.alt || post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 text-center text-white">
            <div className="text-blue-300 font-semibold mb-4">
              {formatCategory(post.category)}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {post.title}
            </h1>
            <div className="flex items-center justify-center gap-6 text-gray-300">
              <span>{post.author.name}</span>
              <span>•</span>
              <span>{formatDate(post.publishedAt)}</span>
              <span>•</span>
              <span>{post.readTime} min read</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Meta Info */}
        <div className="mb-8 pb-8 border-b border-gray-200">
          <p className="text-xl text-gray-600 leading-relaxed">
            {post.excerpt}
          </p>
          {post.tags && post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Blog Content */}
        <div 
          className="prose prose-lg max-w-none prose-gray"
          style={{ color: '#1f2937' }}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* Author Info */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">{post.author.name}</h3>
            <p className="text-gray-600">{post.author.role}</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-blue-50 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Need Expert Medical Equipment Solutions?</h3>
          <p className="text-gray-700 mb-6">
            Contact Apex Gas for comprehensive medical gas systems, X-ray equipment, and professional services.
          </p>
          <a
            href="https://apeximagegas.net/#contact"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Get a Free Consultation
          </a>
        </div>
      </div>
    </article>
  );
}