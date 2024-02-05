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
        <AuthenticatedLayout user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Posts</h2>}>

            <Head title="Posts" />
 
            <div className="rounded-xl border max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit}>
                    <label htmlFor="title" className='font-semibold'>Title</label>
                    <input id="title" type="text"
                        value={data.title}
                        placeholder="Title here..."
                        className="mb-2 w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={(e) => setData('title', e.target.value)}
                    />
                    <label htmlFor="content" className='font-semibold'>Content</label>
                    <textarea
                        value={data.content}
                        placeholder="What's on your mind?"
                        className="w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={e => setData('content', e.target.value)}
                    ></textarea>
                    <InputError message={errors.message} className="mt-2" />
                    <PrimaryButton className="mt-4" disabled={processing}>Post</PrimaryButton>
                </form>

                
            </div>

            <div className="max-w-2xl mx-auto mt-6 bg-white shadow-sm rounded-lg divide-y">
            {posts ? (
                    posts.map(post => <Post key={post.id} post={post} />)
                ) : (
                    <p>No posts available.</p>
                )}
            </div>
        </AuthenticatedLayout>
    );
}