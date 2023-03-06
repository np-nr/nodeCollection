import { createWebHashHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("./views/Home.vue"),
  },
  {
    path: "/webSocket",
    name: "WebSocket",
    component: () => import("./views/WebSocket.vue"),
  },
  {
    path: "/anchor",
    name: "Anchor",
    component: () => import("./views/Anchor.vue"),
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
