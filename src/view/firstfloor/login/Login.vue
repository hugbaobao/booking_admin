<template>
<div class="login">
    <div class="content">
        <div class="left">
            <p>Moony</p>
            <div class="svg">
                <img src="../../../assets/png/Abstraction.png" alt="">
            </div>
        </div>
        <div class="form">
            <div class="container">
                <my-login></my-login>
            </div>
        </div>
    </div>
</div>
</template>

  <script setup lang="ts">
  import MyLogin from '@/components/login/Login.vue'
  </script>

  <style lang="scss" scoped>
  .login {
    height: 100vh;
    background-color: #e1eaff;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .content {
        width: 55%;
        height: 80%;
        background-color: #b1d9db;
        border-radius: 50px;
        display: flex;
        >div {
            height: 100%;
        }
        .left {
            flex: 1;
            position: relative;
            p {
                margin: 100px 0 0 50px;
                color: #fff;
                font-weight: 700;
                font-size: 50px;
            }
            .svg {
                position: absolute;
                top: 200px;
                left: 0;
                img {
                    width: 471px;
                }
            }
        }
        .form {
            width: 60%;
            background-color: #fff;
            border-radius: 50px;
            padding: 100px;
            .container {
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    }
  }
  </style>
  