import React, { useState, useRef } from 'react'
import {
  Plus,
  Save,
  Image as ImageIcon,
  Video,
} from "lucide-react";
import courseService from '../services/course';
import { useNavigate } from 'react-router-dom';
import { ErrorPopup } from '../components';


function AddNewCourse() {
    const [formData, setFormData] = useState({
      title: "",
      description: "",
      imageUrl: "",
      price: 0,
      category: "",
    });

    const categories = [
        { id: "dsa", name: "Data Structures & Algorithms" },
        { id: "ml", name: "Machine Learning" },
        { id: "web", name: "Web Development" },
        { id: "mobile", name: "Mobile Development" },
        { id: "cloud", name: "Cloud Computing" },
        { id: "devops", name: "DevOps" },
        { id: "security", name: "Cybersecurity" },
        { id: "blockchain", name: "Blockchain" },
        { id: "ai", name: "Artificial Intelligence" },
        { id: "database", name: "Database Management" },
    ];

    const imageInputRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [popUp, setPopUp] = useState(false);
    const navigate = useNavigate();

    const [previewImage, setPreviewImage] = useState(formData.imageUrl || "");
    
    const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setFormData({ ...formData, imageUrl:file});
    }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log("formData: ", formData);

        try {
            setLoading(true);
            const data = new FormData();
            data.append("title", formData.title);
            data.append("description", formData.description);
            data.append("price", formData.price);
            data.append("category", formData.category);
            data.append("imageUrl", formData.imageUrl);
            const res = await courseService.createCourse(data);
            if(res.success){
                setPopUp(true);
                setTimeout(() => {
                    navigate("/user/created")
                    setPopUp(false);
                }, 5000)
            }
            setLoading(false);

            console.log("course Created",res);
        } catch (error) {
            console.log("Add new course error", error)   
        }
    }

    const handleFormCanceled = () => {
        console.log("form cancel")
    }

  return (
    <>
    <div className=" bg-gray-50">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form
          className="space-y-6"
          onSubmit={handleFormSubmit}
        >
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price (₹)
                  </label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        price: Number(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Image
                </label>
                <div className="space-y-2">
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => imageInputRef.current?.click()}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                    >
                      <ImageIcon className="w-4 h-4" />
                      Choose Image
                    </button>
                    <input
                      ref={imageInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                  {previewImage && (
                    <div className="relative w-48 h-32 rounded-lg overflow-hidden">
                      <img
                        src={previewImage}
                        alt="Course preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
              </div>
            </div>

          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleFormCanceled}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2 font-medium"
            >   
                {(!loading)?<Save className="w-4 h-4" /> :null}
                {(loading) ?
                    <div className="flex items-center justify-center">
                    <svg
                      className="w-5 h-5 mr-2 text-white animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 01-8 8z"
                      ></path>
                    </svg>
                    Processing...
                  </div>
                  : 
                  ("Create Course")}
            </button>
          </div>

        </form>
      </main>
      
    </div>
    {(popUp)?<ErrorPopup type="success" duration={5000} message={"Course Created successfully"}/>:null}
    </>
    
  )
}

export default AddNewCourse
