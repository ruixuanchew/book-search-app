<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-brand-primary rounded-2xl shadow-xl w-96 p-6 relative">
      <!-- Close Button -->
      <button 
        class="absolute top-3 right-3 text-white hover:text-gray-800"
        @click="$emit('close')"
      >
        ✕
      </button>

      <h2 class="text-xl font-bold mb-4 text-brand-secondary">Login</h2>

      <form @submit.prevent="handleLogin" class="flex flex-col gap-4">
        <input 
          v-model="email" 
          type="email" 
          placeholder="Email" 
          class="border p-2 rounded-md w-full"
          required
        />
        <input 
          v-model="password" 
          type="password" 
          placeholder="Password" 
          class="border p-2 rounded-md w-full"
          required
        />

        <!-- Signup Prompt -->
        <p class="text-white text-sm mt-2">
          Don't have an account? 
          <button 
            type="button" 
            class="text-brand-secondary font-semibold ml-1 hover:underline"
            @click="$emit('show-signup')"
          >
            Create an account!
          </button>
        </p>

        <!-- Login Button -->
        <button 
          type="submit"
          class="bg-brand-accent text-white py-2 rounded-lg font-semibold hover:bg-brand-hover transition mt-2"
        >
          Login
        </button>
      </form>

      <p v-if="errorMessage" class="text-red-500 mt-2 text-sm">
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginModal",
  data() {
    return {
      email: "",
      password: "",
      errorMessage: ""
    }
  },
  methods: {
    async handleLogin() {
      try {
        const res = await fetch("http://localhost:5000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: this.email, password: this.password })
        });
        const data = await res.json();

        if (res.ok) {
          localStorage.setItem("token", data.token);
          this.$emit("logged-in");
          this.$emit("close"); 
        } else {
          this.errorMessage = data.error || "Login failed";
        }
      } catch (err) {
        this.errorMessage = "Something went wrong";
        console.error(err);
      }
    }
  }
}
</script>
