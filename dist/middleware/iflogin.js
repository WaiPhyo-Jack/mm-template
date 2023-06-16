"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isLoggedIn = (req, res, next) => {
    var _a;
    if (((_a = req.session.user) === null || _a === void 0 ? void 0 : _a.login) == true) {
        return next();
    }
    res.redirect("/login");
};
exports.default = isLoggedIn;
