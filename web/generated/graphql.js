"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.useLoginMutation = exports.LoginDocument = exports.StudentResponseFragmentDoc = exports.MiniStudentResponseFragmentDoc = void 0;
var client_1 = require("@apollo/client");
var Apollo = require("@apollo/client");
var defaultOptions = {};
exports.MiniStudentResponseFragmentDoc = (0, client_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    fragment MiniStudentResponse on Student {\n  id\n  uniqueId\n  email\n  createdAt\n  username\n  active\n}\n    "], ["\n    fragment MiniStudentResponse on Student {\n  id\n  uniqueId\n  email\n  createdAt\n  username\n  active\n}\n    "])));
exports.StudentResponseFragmentDoc = (0, client_1.gql)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    fragment StudentResponse on StudentResponse {\n  errors {\n    field\n    message\n  }\n  student {\n    ...MiniStudentResponse\n  }\n}\n    ", ""], ["\n    fragment StudentResponse on StudentResponse {\n  errors {\n    field\n    message\n  }\n  student {\n    ...MiniStudentResponse\n  }\n}\n    ", ""])), exports.MiniStudentResponseFragmentDoc);
exports.LoginDocument = (0, client_1.gql)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    mutation Login($options: LoginInput!) {\n  login(options: $options) {\n    ...StudentResponse\n  }\n}\n    ", ""], ["\n    mutation Login($options: LoginInput!) {\n  login(options: $options) {\n    ...StudentResponse\n  }\n}\n    ", ""])), exports.StudentResponseFragmentDoc);
/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
function useLoginMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.LoginDocument, options);
}
exports.useLoginMutation = useLoginMutation;
var templateObject_1, templateObject_2, templateObject_3;
