//idk
const getSidebarItems = async (req, res) => {
    // temp data ++db data to be taken
    const sidebarItems = [
        { id: 1, title: 'Home', url: '/home' },
        { id: 2, title: 'About', url: '/about' },
        { id: 3, title: 'Contact', url: '/contact' },
        // Add more sidebar items as needed
    ];

    res.json({ sidebarItems });
};

module.exports = {
    getSidebarItems,
};
