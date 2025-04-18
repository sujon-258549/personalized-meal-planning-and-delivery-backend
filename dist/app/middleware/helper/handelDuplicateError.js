"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handelDuplicateError = void 0;
const http_status_1 = __importDefault(require("http-status"));
const handelDuplicateError = (err, res) => {
    res.status(http_status_1.default.CONFLICT).json({
        success: false,
        message: err.message,
        err: err,
    });
};
exports.handelDuplicateError = handelDuplicateError;
