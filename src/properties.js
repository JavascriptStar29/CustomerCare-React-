export const version = '0.1';
export const meveo_path = "/meveo";
export const provider = "DEMO";
export const api_user = {
	username: "selfcare.default",
	password: "selfcare.default"
};

let baseUrl = "";

// routes
export const root = "/";
export const secured = root + "customer-care/";
// export const index = "index.html";
export const index_url = baseUrl + "/index.html";

export const about = {route: "about", path: root + "about"};
export const sign_in = {route: "sign-in", path: root + "sign-in"};
export const new_password = {route: "new-password", path: root + "new-password"};
export const forgot_password = {route: "forgot-password", path: root + "forgot-password"};
export const reset_password = {route: "reset-password", path: root + "reset-password"};

export const customers = {route: "customers", path: secured + "customers"};
export const edit_customer = {route: "edit", path: secured + "customers/edit"};
export const home = {route: "home", path: secured + "home"};
export const invoices = {route: "invoices", path: secured + "invoices"};
export const manage_roles = {route: "manage-roles", path: secured + "settings/manage-roles"};
export const my_company = {route: "my-company", path: secured + "settings/my-company"};
export const new_customer = {route: "new", path: secured + "customers/new"};
export const orders = {route: "orders", path: secured + "orders"};
export const payments = {route: "payments", path: secured + "payments"};
export const settings = {route: "settings", path: secured + "settings"};
export const subscriptions = {route: "subscriptions", path: secured + "subscriptions"};
export const validation_workflow = {route: "validation-workflow", path: secured + "orders/validation-workflow"};
export const view_customer = {route: "view", path: secured + "customers/view"};
export const view_subscription = {route: "view", path: secured + "subscriptions/view"};
