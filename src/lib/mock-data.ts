export const mockStats = {
    totalProducts: 2453,
    totalValue: 124500.00,
    lowStockItems: 12,
    categories: 8
};

export const mockLowStock = [
    { id: "1", name: "Ray-Ban Aviator Classic", sku: "RB3025", stock: 2, threshold: 5 },
    { id: "2", name: "Oakley Holbrook", sku: "OO9102", stock: 1, threshold: 3 },
    { id: "3", name: "Acuvue Oasys 1-Day", sku: "ACU-O1D", stock: 0, threshold: 10 },
    { id: "4", name: "Tom Ford FT5401", sku: "TF5401", stock: 2, threshold: 4 },
];

export const mockRecentActivity = [
    { id: "1", action: "Restock", item: "Acuvue Oasys", quantity: 50, date: "2 hours ago", user: "Tusher S." },
    { id: "2", action: "Sale", item: "Ray-Ban Wayfarer", quantity: -1, date: "4 hours ago", user: "John D." },
    { id: "3", action: "Adjustment", item: "Oakley Flak 2.0", quantity: -2, date: "1 day ago", user: "Admin", note: "Damaged inventory" },
    { id: "4", action: "New Item", item: "Gucci GG0006O", quantity: 15, date: "2 days ago", user: "Tusher S." },
];

export const mockProducts = [
    { id: "p1", name: "Ray-Ban Wayfarer", sku: "RB2140", category: "Frames", price: 150.00, stock: 24, status: "In Stock" },
    { id: "p2", name: "Acuvue Oasys", sku: "ACU-OAS", category: "Contacts", price: 45.00, stock: 120, status: "In Stock" },
    { id: "p3", name: "Oakley Holbrook", sku: "OO9102", category: "Frames", price: 135.00, stock: 1, status: "Low Stock" },
    { id: "p4", name: "Tom Ford FT5401", sku: "TF5401", category: "Frames", price: 320.00, stock: 8, status: "In Stock" },
    { id: "p5", name: "Bausch & Lomb Ultra", sku: "BL-ULT", category: "Contacts", price: 55.00, stock: 0, status: "Out of Stock" },
    { id: "p6", name: "Prada PR 17WS", sku: "PR17WS", category: "Frames", price: 290.00, stock: 15, status: "In Stock" },
    { id: "p7", name: "Lens Cleaning Kit", sku: "ACC-CLN", category: "Accessories", price: 15.00, stock: 45, status: "In Stock" },
];
