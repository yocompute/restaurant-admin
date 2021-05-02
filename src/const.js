export const JWT_COOKIE = 'shippal_jwt';
export const JWT_EXPIRY = 7;

export const CLIENT_HOST = 'https://www.yocompute.com';

export const HOME_PAGE = 'page/home';
export const BRAND_PAGE = 'page/brand';
export const PRODUCT_PAGE = 'page/product';
export const CART_PAGE = 'page/cart';
export const PAYMENT_PAGE = 'pay/payment';
export const ORDER_PAGE = 'page/order';

export const OrderStatus = {
    New: 'N',
    Paid: 'P',
    Cancelled: 'C' 
}

export const PaymentStatus = {
    New: 'N',
    Paid: 'P',
    Cancelled: 'C'
}

export const PaymentMethod = {
    CreditCard: 'CC',
    Wechat: 'W'
}

export const Role = {
    Super: "Super",
    Admin: "Admin",
    CustomerService: "Customer Service",
    Driver: "Driver"
}

export const Roles = ["Super", "Admin", "Customer Service", "Driver"];

export const Path = {
    Home: '/',
    Brands: '/brands',
    Qrcodes: '/qrcodes',
    Roles: '/roles',
    Users: '/users',
    Categories: '/categories',
    Products: '/products',
    Specs: '/specs',
    Payments: '/payments',
    Orders: '/orders'
}

export const Permissions = {
    [Path.Home]: ["Super", "Admin"],
    "/brands/new": ["Super"],
    [Path.Brands]: ["Super", "Admin"],
    [Path.Roles]: ["Super"],
    "/roles/new": ["Super"],
    "/roles/:id": ["Super"],
    [Path.Payments]: ["Super", "Admin"],
    [Path.Orders]: ["Super", "Admin"],
    [Path.Categories]: ["Super", "Admin"],
    [Path.Products]: ["Super", "Admin"],
    [Path.Qrcodes]: ["Super", "Admin"],
    [Path.Specs]: ["Super", "Admin"],
    [Path.Users]: ["Super"],
}

export const AppMode = {
    DEV: 'dev',
    PROD: 'prod'
}

export const QrcodeTag = {
    Dine: 'dine',
    Takeaway: 'takeaway'
}