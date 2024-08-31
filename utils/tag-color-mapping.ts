// tagColorUtils.ts

export const getTagColor = (tag: string): string => {
    const tagColors: { [key: string]: string } = {
        tech: "bg-blue-200 text-blue-800",
        economics: "bg-green-200 text-green-800",
        history: "bg-purple-200 text-purple-800",
        Finance: "bg-yellow-200 text-yellow-800",
        Statistics: "bg-pink-200 text-pink-800",
        Politics: "bg-teal-200 text-teal-800",
        // TODO: Add more tag-color mappings
    };
    return tagColors[tag] || "bg-gray-200 text-gray-800"; // Default color if no match is found
};
