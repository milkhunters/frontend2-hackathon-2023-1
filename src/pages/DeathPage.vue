<template>
  <div class="blue-screen">
    <div class="bsod-header">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="50" height="50">
        <path fill="#FFF" d="M147.6 364.8l-23.7-23.7L23.7 256l100.2-84.9 23.7-23.7L0 256zM256 23.7v100.2L171.1 87.4l-23.7-23.7L256 0zM496.3 256l-100.2-84.9-23.7 23.7L488.4 256l-100.2 84.9 23.7 23.7L512 256z"/>
      </svg>
      <h1>Blue Screen of Death</h1>
    </div>
    <div class="bsod-message">
      <p>A problem has been detected and your computer has been shut down to prevent damage to your system.</p>
      <p>Technical information:</p>
      <p>*** STOP: 0x0000007E (0xFFFFFFFFC0000005, 0xFFFFF88007B9C4F7, 0xFFFFF8800418E4D8, 0xFFFFF8800418DD30)</p>
      <p>*** win32k.sys - Address FFFFF88007B9C4F7 base at FFFFF88005680000, DateStamp 4faa50c0</p>
    </div>
  </div>
</template>

<style>
.blue-screen {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  padding: 50px;
  background-color: #0072c6;
  color: white;
  font-family: Arial, sans-serif;
  font-size: 18px;
}

.bsod-header {
  display: flex;
  align-items: center;
  margin-bottom: 50px;
}

.bsod-header svg {
  fill: white;
  margin-right: 10px;
}

.bsod-header h1 {
  font-size: 28px;
  margin: 0;
}

.bsod-message {
  line-height: 1.5;
}
</style>
