// Import h3 as npm dependency
import {
  createApp,
  createRouter,
  defineEventHandler,
  sendProxy,
  proxyRequest,
  getProxyRequestHeaders,
  ProxyOptions,
} from "h3";
import { consola } from "consola";

const target = "https://api.openai.com";

// Create an app instance
export const app = createApp();

// Create a new router and register it in app
const router = createRouter();
app.use(router);

// Add a new route that matches GET requests to / path
router.use(
  "/**",
  defineEventHandler(async (event) => {
    consola.info("Event", event.path);
    try {
      const preq = await proxyRequest(event, target, {
        headers: getProxyRequestHeaders(event),
      });
      consola.success("Proxy request", preq);
      return "hello";
    } catch (error) {
      consola.error("Error", error);
      return "oh no";
    }
  })
);
