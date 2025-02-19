import React from "react";
import CountUp from "react-countup";
import { FaHiking, FaMountain, FaCompass, FaUsers } from "react-icons/fa";

const SuccessSection = () => {
    const stats = [
        {
            id: 1,
            title: "Adventurers",
            icon: <FaUsers className="text-5xl text-green-600" />,
            count: 5200,
            desc: "↗︎ 500 (10%) this month",
        },
        {
            id: 2,
            title: "Expeditions",
            icon: <FaMountain className="text-5xl text-yellow-600" />,
            count: 320,
            desc: "↗︎ 30 (9%) this month",
        },
        {
            id: 3,
            title: "Destinations",
            icon: <FaCompass className="text-5xl text-blue-600" />,
            count: 150,
            desc: "↗︎ 15 (11%) this month",
        },
        {
            id: 4,
            title: "Treks Completed",
            icon: <FaHiking className="text-5xl text-red-600" />,
            count: 850,
            desc: "↗︎ 80 (12%) this month",
        },
    ];

    return (
        <div className="py-16 bg-base-50 container mx-auto ">
            <h2 className="text-center text-2xl  md:text-3xl font-bold text-black mb-5 dark:text-gray-200">
                Our Adventure Milestones
            </h2>
            <p className="text-center lg:px-[20rem] mb-5 dark:text-gray-400">
                Join us in celebrating our ever-growing community of adventurers.
            </p>
            <div className="grid gap-8 py-7 rounded-2xl px-6 bg-base-300 dark:bg-gray-900 sm:px-8 md:px-16 lg:px-24 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <div
                        key={stat.id}
                        className="stat flex flex-col items-center bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
                    >
                        <div>{stat.icon}</div>
                        <div className="stat-title text-lg font-medium text-gray-600 mt-4 text-center dark:text-gray-200">
                            {stat.title}
                        </div>
                        <div className="stat-value text-4xl font-bold text-gray-800 mt-2 dark:text-gray-100">
                            <CountUp start={0} end={stat.count} duration={8} separator="," />
                        </div>
                        <div className="stat-desc text-sm text-gray-500 mt-2 text-center dark:text-gray-400">
                            {stat.desc}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SuccessSection;
