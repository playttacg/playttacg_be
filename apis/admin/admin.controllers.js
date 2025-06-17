import Admin from "./admin.models.js"
export const getAllAdmins = async(req, res) => {
    try {
        const admins = await Admin.find({}, '-password'); // Exclude password field
        res.status(200).json(admins);
    } catch (error) {
        console.error("Error fetching admins:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export const adminSignup = async (req, res) => {
    const { name, username, email, password, role } = req.body;

    if (!name || !username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newAdmin = new Admin({
            name,
            username,
            email,
            password, // Ensure to hash the password before saving in production
            role: role || 'admin', // Default to 'admin' if no role is provided
        });

        await newAdmin.save();
        res.status(201).json({ message: "Admin created successfully", admin: newAdmin });
    } catch (error) {
        console.error("Error creating admin:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export const adminLogin = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    try {
        const admin = await Admin.findOne({ username }).select('+password'); // Include password for comparison

        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        // Here you should compare the hashed password with the provided password
        // For example, using bcrypt:
        // const isMatch = await bcrypt.compare(password, admin.password);
        // if (!isMatch) {
        //     return res.status(401).json({ message: "Invalid credentials" });
        // }

        res.status(200).json({ message: "Login successful", admin: { id: admin._id, name: admin.name, role: admin.role } });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}