import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Post from '@/Components/Post';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, Head } from '@inertiajs/react';
 
export default function Index({ auth, posts }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        title: '',
        content: '',
    });
 
    const submit = (e) => {
        e.preventDefault();
        post(route('posts.store'), { onSuccess: () => reset() });
    };
 
    return (
        <AuthenticatedLayout user={auth.user}>

            <Head title="Posts" />
  
            <div className="rounded-xl bg-gray-600 text-white max-w-2xl mx-auto p-4 mt-10 sm:p-6 lg:p-8">
                <form onSubmit={submit}>
                    <label htmlFor="title" className='font-semibold'>Title</label>
                    <input id="title" type="text"
                        value={data.title}
                        placeholder="Title here..."
                        className="bg-gray-500 text-white placeholder:text-white mb-2 w-full focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={(e) => setData('title', e.target.value)}
                    />
                    <label htmlFor="content" className='font-semibold'>Content</label>
                    <textarea
                        value={data.content}
                        placeholder="What's on your mind?"
                        className="resize-none w-full bg-gray-500 text-white placeholder:text-white focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={e => setData('content', e.target.value)}
                    ></textarea>
                    <InputError message={errors.message} className="mt-2" />
                    <div className='w-full flex justify-end'>
                        <PrimaryButton className="mt-4" disabled={processing}>Post</PrimaryButton>
                    </div>
                </form>

                
            </div>

            <div className="max-w-2xl mx-auto mt-6 divide-y divide-gray-500">
            {posts ? (
                    posts.map(post => <Post key={post.id} post={post} />)
                ) : (
                    <p>No posts available.</p>
                )}
            </div>
        </AuthenticatedLayout>
    );
}