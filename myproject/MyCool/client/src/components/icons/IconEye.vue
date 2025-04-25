<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="eye-icon"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
</template>

<style scoped>
.eye-icon {
  transition: all 0.3s ease;
  cursor: pointer;
}

.eye-icon:hover {
  transform: scale(1.1);
  stroke: #4facfe;
}

.eye-icon.active {
  stroke: #4facfe;
}
</style> 