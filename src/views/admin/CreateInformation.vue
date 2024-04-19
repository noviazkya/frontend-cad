<template>
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold mb-4">Create Information</h1>
        <el-form :model="form" :rules="rules" ref="informationForm" label-width="120px">
          <el-form-item label="Title" prop="title">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="Opening" prop="opening">
            <el-input v-model="form.opening"></el-input>
          </el-form-item>
          <!-- Category dropdown -->
        <el-form-item label="Category" prop="category">
          <el-select v-model="form.category" placeholder="Select category">
            <el-option v-for="category in categories" :key="category.id" :label="category.name" :value="category.id"></el-option>
          </el-select>
        </el-form-item>
          <el-form-item label="Date" prop="date">
            <el-date-picker v-model="form.date" type="date" format="YYYY/MM/DD" value-format="YYYY-MM-DD"
            placeholder="Choose date"></el-date-picker>
          </el-form-item>
          <el-form-item label="Description" prop="description">
            <el-input v-model="form.description" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="Address" prop="address">
          <el-input v-model="form.address" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="Tag" prop="tags">
          <el-tag
            v-for="tag in form.tags"
            :key="tag"
            closable
            @close="removeTag(tag)"
          >{{ tag }}</el-tag>
          <el-input
            v-model="tagInput"
            @keyup.enter="addTag"
            placeholder="Enter tag"
          ></el-input>
        </el-form-item>
          <label
            for="dropzone-file"
            class="mb-5 mx-20 cursor-pointer flex w-full max-w-lg flex-col items-center rounded-xl border-2 border-dashed border-blue-400 bg-white p-6 text-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-10 w-10 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
  
            <h2 class="mt-4 text-xl font-medium text-gray-700 tracking-wide">
              Collection Image
            </h2>
  
            <p class="mt-2 text-gray-500 tracking-wide">
              Upload or drag & drop your file PNG, JPG or JPEG.
            </p>
            <input
              id="dropzone-file"
              type="file"
              class="hidden"
              ref="fileInput"
              @change="handleFileUpload"
              :rules="[
                {
                  required: true,
                  message: 'Please upload an image file',
                  trigger: 'change',
                },
                {
                  validator: this.validateFile,
                  trigger: 'change',
                },
              ]"
            />
            <!-- Pratinjau (preview) file -->
            <div v-if="form.inputFile" class="mt-4">
              <strong>File Preview:</strong>
              <img
                v-if="isImageFile(form.inputFile)"
                :src="filePreview"
                alt="File Preview"
                class="mt-2 max-w-full"
              />
              <span v-else>{{ form.inputFile.name }}</span>
  
              <!-- Tombol hapus -->
              <button
                type="button"
                class="mt-2 text-red-600 cursor-pointer"
                @click="deleteFile"
              >
                Delete
              </button>
            </div>
          </label>
          <el-form-item>
            <el-button type="primary" plain :loading="isLoading" native-type="button" @click="submitForm">Submit</el-button>
            <el-button @click="resetForm">Reset</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </template>
  
  <script>
  import { ElInput, ElDatePicker, ElForm, ElFormItem, ElButton, ElMessage, ElSelect, ElOption } from 'element-plus';
  import { mapActions } from 'vuex';
  
  export default {
    components: {
      ElInput,
      ElDatePicker,
      ElForm,
      ElFormItem,
      ElButton,
      ElSelect,
      ElOption
    },
    data() {
      return {
        form: {
          title: '',
          opening: '',
          category: '',
          date: '',
          description: '',
          address: '',
          inputFile: null,
          tags: []
        },
        rules: {
          title: [{ required: true, message: 'Title is required', trigger: 'blur' }],
          opening: [{ required: true, message: 'Opening is required', trigger: 'blur' }],
          category: [{ required: true, message: 'Category is required', trigger: 'blur' }],
          date: [{ required: true, message: 'Date is required', trigger: 'blur' }],
          description: [{ required: true, message: 'Description is required', trigger: 'blur' }],
          address: [{ required: true, message: 'Address is required', trigger: 'blur' }],
          inputFile: [{ required: true, message: 'Image is required', trigger: 'blur' }],
        },
        isLoading: false,
        filePreview: null,
        categories: [ // Sample categories data
                { id: 1, name: 'Category 1' },
                { id: 2, name: 'Category 2' },
                { id: 3, name: 'Category 3' },
            ],
            categories: [ // Sample categories data
        { id: 1, name: 'Exhibition' },
        { id: 2, name: 'Workshop' },
        { id: 3, name: 'Seminar' },
      ],
      tagInput: '' 
      };
    },
    methods: {
      ...mapActions('informations', ['createInformation']),
      validateFile(rule, value, callback) {
        // File validation remains the same
      },
      handleFileUpload(event) {
        const fileInput = event.target.files[0];
        if (!fileInput) return;
  
        // File type and size validation remains the same
  
        const imageUrl = URL.createObjectURL(fileInput);
        this.filePreview = imageUrl;
        this.form.inputFile = fileInput;
      },
      isImageFile(file) {
        return file.type.startsWith("image/");
      },
      deleteFile() {
        this.filePreview = null;
        this.form.inputFile = null;
      },
      async submitForm() {
      try {
        this.isLoading = true;
        await this.$refs.informationForm.validate();

        if (!this.form.inputFile) {
          ElMessage.error("Please upload an image file.");
          return;
        }

        const formData = new FormData();
        formData.append('inputFile', this.form.inputFile);

        Object.keys(this.form).forEach((key) => {
          if (key !== "inputFile") {
            formData.append(key, this.form[key]);
          }
        });

        // Append tags to formData
        formData.append('tags', this.form.tags.join(',')); // Convert tags array to string

        await this.createInformation(formData);

        ElMessage.success('Information created successfully!');
        this.$router.push({ name: "InformationAdmin" });
        this.$refs.informationForm.resetFields();
      } catch (error) {
        console.error('Error creating Information:', error);
        ElMessage.error('Failed to create Information');
      } finally {
        this.isLoading = false;
      }
    },
    resetForm() {
      this.form.title = '';
      this.form.opening = '';
      this.form.category = '';
      this.form.date = '';
      this.form.description = '';
      this.form.inputFile = null;
      this.form.tags = [];
    },
    addTag() {
      if (this.tagInput.trim() !== '') {
        this.form.tags.push(this.tagInput.trim());
        this.tagInput = ''; // Clear tag input after adding tag
      }
    },
    removeTag(tag) {
      const index = this.form.tags.indexOf(tag);
      if (index !== -1) {
        this.form.tags.splice(index, 1);
      }
    },
    },
  };
  </script>
