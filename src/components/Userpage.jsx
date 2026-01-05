import React from 'react';
import ProjectCard from './ProjectCard';

const Userpage = () => {
    const projects = [
        {
            id: 1,
            userid: "User 1",
            title: "Stock Market",
            description: "This project is about Creating a live stock market tracking system with real-time updates and interactive charts.",
            details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod."
        },
        {
            id: 2,
            userid: "User 2",
            title: "AI Task Management",
            description: "An AI-powered task management assistant that helps users prioritize their work and stay productive.",
            details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod."
        },
        {
            id: 3,
            userid: "User 3",
            title: "Decentralized Voting",
            description: "A secure and decentralized voting platform built on blockchain technology for transparent and tamper-proof elections.",
            details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod."
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white selection:bg-green-500/30">

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
                <div className="flex flex-col space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                            Innovative <span className="text-green-500">Community</span>
                        </h1>
                        <p className="text-gray-400 text-lg max-w-2xl">
                            A place for innovators to share their ideas and collaborate with others.
                        </p>
                    </div>

                    <div className="flex flex-col space-y-6 mx-auto w-full">
                        {projects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                userid={project.userid}
                                title={project.title}
                                description={project.description}
                            />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Userpage;
