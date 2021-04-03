const roleToRouter = {
    "coustomer": [{
        name: "Product"
    }, {
        name: "ProductList"
    }, {
        name: 'ProductAdd'
    }],
    "admin": [{
        name: "Product"
    }, {
        name: "ProductList"
    }, {
        name: 'ProductAdd'
    }, {
        name: "Category"
    }]
}
export default function getMenuRouter(role, router) {
    const allowMenuRouter = roleToRouter[role].map(item => item.name);
    const resultMenuRouter = router.filter(item => {
        if (item.children) {
            item.children = item.children.filter(item2 => {
                if (allowMenuRouter.indexOf(item2.name) != -1) return true;
                else return false;
            })
        }
        if (allowMenuRouter.indexOf(item.name) != -1) return true;
        else return false;
    })
    return resultMenuRouter;
}