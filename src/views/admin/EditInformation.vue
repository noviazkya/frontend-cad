<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold mb-4">Edit Information</h1>
      <el-form @submit.prevent="submitForm" :model="form" :rules="rules" ref="informationForm" label-width="120px">
        <el-form-item label="Title" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="Subtitle" prop="opening">
          <el-input v-model="form.opening"></el-input>
        </el-form-item>
        <!-- Category dropdown -->
        <el-form-item label="Category" prop="category">
          <el-select v-model="form.category" placeholder="Select category">
            <el-option v-for="category in categories" :key="category.id" :label="category.name" :value="category.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Date" prop="date">
          <el-date-picker v-model="form.date" type="date" format="YYYY/MM/DD" value-format="YYYY-MM-DD" placeholder="Choose date"></el-date-picker>
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
        <el-form-item label="Event Image" prop="inputFile">
          <label for="dropzone-file" class="mb-5 mx-20 cursor-pointer flex w-full max-w-lg flex-col items-center rounded-xl border-2 border-dashed border-blue-400 bg-white p-6 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
            </svg>
            <h2 class="mt-4 text-xl font-medium text-gray-700 tracking-wide">Collection Image</h2>
            <p class="mt-2 text-gray-500 tracking-wide">Upload or drag & drop your file PNG, JPG or JPEG.</p>
            <input id="dropzone-file" type="file" class="hidden" ref="fileInput" @change="handleFileUpload">
            <!-- Pratinjau (preview) file -->
            <div class="mt-4">
              <strong>File Preview:</strong>
              <img :src="filePreview" alt="File Preview" class="mt-2 max-w-full"/>
              <!-- Tombol hapus -->
              <button type="button" class="mt-2 text-red-600 cursor-pointer" @click="deleteFile">Delete</button>
            </div>
          </label>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain :loading="isLoading" native-type="submit">Submit</el-button>
          <el-button @click="resetForm">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { ElButton, ElDatePicker, ElForm, ElFormItem, ElInput, ElSelect, ElOption, ElTag, ElMessage } from 'element-plus';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    ElButton,
    ElDatePicker,
    ElForm,
    ElFormItem,
    ElInput,
    ElSelect,
    ElOption,
    ElTag
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
        tags: [],
        inputFile: null,
      },
      rules: {
        title: [{ required: true, message: 'Title is required', trigger: 'blur' }],
        opening: [{ required: true, message: 'Opening is required', trigger: 'blur' }],
        category: [{ required: true, message: 'Category is required', trigger: 'blur' }],
        date: [{ required: true, message: 'Date is required', trigger: 'blur' }],
        description: [{ required: true, message: 'Description is required', trigger: 'blur' }],
        address: [{ required: true, message: 'Address is required', trigger: 'blur' }],
      },
      isLoading: false,
      tagInput: '',
      categories: [ // Sample categories data
        { id: 1, name: 'Exhibition' },
        { id: 2, name: 'Workshop' },
        { id: 3, name: 'Seminar' },
      ],
      filePreview: null,
    };
  },
  computed: {
    ...mapGetters('informations', ['getInformationById']),
    information() {
      const uuid = this.$route.params.uuid;
      return this.getInformationById(uuid);
    }
  },
  methods: {
    ...mapActions('informations', ['updateInfomation', 'fetchInformationById']),
    informationLoadData() {
      const informationData = this.information;

      this.form.title = informationData?.title || '';
      this.form.opening = informationData?.opening || '';
      this.form.category = informationData?.category || '';
      this.form.date = informationData?.date || '';
      this.form.description = informationData?.description || '';
      this.form.address = informationData?.address || '';

      // Extract tags from information_tags array
      if (informationData?.information_tags && informationData.information_tags.length > 0) {
        const tagsArray = JSON.parse(informationData.information_tags[0].tags);
        this.form.tags = tagsArray || [];
      }
      
      this.filePreview = informationData?.url
      // Assuming you have categories data
      this.categories = informationData?.categories || [];
    },
    handleFileUpload(event) {
    const fileInput = event.target.files[0];
    if (!fileInput) return;

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    const maxSize = 2 * 1024 * 1024; // 2 MB in bytes

    // Check file type
    if (!allowedTypes.includes(fileInput.type)) {
        this.$message.error("Invalid file type. Please upload a valid image file.");
        return;
    }

    // Check file size
    if (fileInput.size > maxSize) {
        this.$message.error("Image size must be less than 2MB");
        return;
    }

    // Create a preview URL for the selected image file
    const imageUrl = URL.createObjectURL(fileInput);
    this.filePreview = imageUrl;

    // Set the selected file object to the form
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

        const formData = new FormData();
        Object.keys(this.form).forEach((key) => {
          if (key !== "inputFile") {
            formData.append(key, this.form[key]);
          }
        });

        if (this.form.inputFile) {
          formData.append("inputFile", this.form.inputFile);
        }

       const success = await this.updateInfomation({
          uuid: this.$route.params.uuid,
          formData: formData,
        });

        if(success){
          this.$router.push('/admin/information');
        this.$refs.informationForm.resetFields();
        }

      } catch (error) {
        console.error('Error updating Information:', error);
      } finally {
        this.isLoading = false;
      }
    },
    addTag() {
      if (this.tagInput.trim() !== '') {1
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
  created() {
    const uuid = this.$route.params.uuid;
    this.isLoading = true;
    this.fetchInformationById(uuid).then(() => {
      this.isLoading = false;
      this.informationLoadData();
    });
  }
};
</script>
