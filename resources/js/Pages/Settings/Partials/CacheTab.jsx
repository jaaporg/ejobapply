// import React from 'react';

import { Head, useForm, usePage, Link } from '@inertiajs/react';
  
export default function CacheTab(props) {
    const { files } = usePage().props
  
    const { data, setData, errors, put, progress } = useForm({
        title: "",
        file: null,
    });
  
    function handleSubmit(e) {
        e.preventDefault();
        put(route('settings.update'))

        console.log(data)
        // post(route("file.upload.store"));
  
        // setData("title", "")
        // setData("file", null)
    }
    
    return (

  
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
  
                            <form name="createForm" onSubmit={handleSubmit}>
                                <div className="flex flex-col">
                                    <div className="mb-4">
                                        <label className="">Title</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2"
                                            label="Title"
                                            name="title"
                                            value={data.title}
                                            onChange={(e) =>
                                                setData("title", e.target.value)
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.title}
                                        </span>
                                    </div>
                                    <div className="mb-0">
                                        <label className="">File</label>
                                        <input
                                            type="file"
                                            className="w-full px-4 py-2"
                                            label="File"
                                            name="file"
                                            onChange={(e) =>
                                                setData("file", e.target.files[0])
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.file}
                                        </span>
                                    </div>
                                </div>
  
                                {progress && (
                                  <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                                    <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" width={progress.percentage}> {progress.percentage}%</div>
                                  </div>
                                )}
  
                                <div className="mt-4">
                                    <button
                                        type="submit"
                                        className="px-6 py-2 font-bold text-white bg-green-500 rounded"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
  
                            <br/>
  
                        </div>
                    </div>
                </div>
            </div>
    );
}