const fs = require("fs").promises;

const deleteUserImage = async (userImagePath) => {
  try {
    // client\public\images
    const basePath = `E:/Mern_Projects/Full_Stack_E_commerce_project/Full_Stack_E_commerce_project/client/public${imagePath}`;
    await fs.access(basePath);
    await fs.unlink(basePath);
    console.log("Image was deleted");
  } catch (error) {
    console.error("user image does not exist");
  }
};

const deleteProductImage = async (imagePath) => {
  try {
    // client\public\images
    const basePath = `E:/Mern_Projects/sagor-departmental/client/public${imagePath}`;

    // I should add previous path from E: to images/pro...
    await fs.access(basePath);
    await fs.unlink(basePath);
    console.log("Image deleted successfully");
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
};

module.exports = { deleteUserImage, deleteProductImage };
