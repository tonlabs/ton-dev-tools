"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/*
 * Copyright 2018-2019 TON DEV SOLUTIONS LTD.
 *
 * Licensed under the SOFTWARE EVALUATION License (the "License"); you may not use
 * this file except in compliance with the License.  You may obtain a copy of the
 * License at: https://www.ton.dev/licenses
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific TON DEV software governing permissions and
 * limitations under the License.
 *
 */
var path = require('path');

var os = require('os');

var config = {
  auth: {
    authconfig: {
      username: process.env.TONDEV_DH_USER,
      password: process.env.TONDEV_DH_PASSWORD
    }
  },
  localNode: {
    image: 'tonlabs/local-node:0.11.0',
    container: 'tonlabs-local-node'
  },
  compilers: {
    image: 'tonlabs/compilers:0.11.0',
    container: 'tonlabs-compiler-kit',
    mountSource: path.join(os.homedir(), '.tonlabs', 'compilers', 'projects'),
    mountDestination: '/projects'
  }
};
var _default = config;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb25maWcuanMiXSwibmFtZXMiOlsicGF0aCIsInJlcXVpcmUiLCJvcyIsImNvbmZpZyIsImF1dGgiLCJhdXRoY29uZmlnIiwidXNlcm5hbWUiLCJwcm9jZXNzIiwiZW52IiwiVE9OREVWX0RIX1VTRVIiLCJwYXNzd29yZCIsIlRPTkRFVl9ESF9QQVNTV09SRCIsImxvY2FsTm9kZSIsImltYWdlIiwiY29udGFpbmVyIiwiY29tcGlsZXJzIiwibW91bnRTb3VyY2UiLCJqb2luIiwiaG9tZWRpciIsIm1vdW50RGVzdGluYXRpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7QUFnQkEsSUFBTUEsSUFBSSxHQUFHQyxPQUFPLENBQUMsTUFBRCxDQUFwQjs7QUFDQSxJQUFNQyxFQUFFLEdBQUdELE9BQU8sQ0FBQyxJQUFELENBQWxCOztBQUVBLElBQU1FLE1BQU0sR0FBRztBQUNYQyxFQUFBQSxJQUFJLEVBQUU7QUFDRkMsSUFBQUEsVUFBVSxFQUFFO0FBQ1JDLE1BQUFBLFFBQVEsRUFBRUMsT0FBTyxDQUFDQyxHQUFSLENBQVlDLGNBRGQ7QUFFUkMsTUFBQUEsUUFBUSxFQUFFSCxPQUFPLENBQUNDLEdBQVIsQ0FBWUc7QUFGZDtBQURWLEdBREs7QUFPWEMsRUFBQUEsU0FBUyxFQUFFO0FBQ1BDLElBQUFBLEtBQUssRUFBRSwyQkFEQTtBQUVQQyxJQUFBQSxTQUFTLEVBQUU7QUFGSixHQVBBO0FBV1hDLEVBQUFBLFNBQVMsRUFBRTtBQUNQRixJQUFBQSxLQUFLLEVBQUUsMEJBREE7QUFFUEMsSUFBQUEsU0FBUyxFQUFFLHNCQUZKO0FBR1BFLElBQUFBLFdBQVcsRUFBRWhCLElBQUksQ0FBQ2lCLElBQUwsQ0FBVWYsRUFBRSxDQUFDZ0IsT0FBSCxFQUFWLEVBQXdCLFVBQXhCLEVBQW9DLFdBQXBDLEVBQWlELFVBQWpELENBSE47QUFJUEMsSUFBQUEsZ0JBQWdCLEVBQUU7QUFKWDtBQVhBLENBQWY7ZUFvQmVoQixNIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE4LTIwMTkgVE9OIERFViBTT0xVVElPTlMgTFRELlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBTT0ZUV0FSRSBFVkFMVUFUSU9OIExpY2Vuc2UgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxuICogdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXG4gKiBMaWNlbnNlIGF0OiBodHRwczovL3d3dy50b24uZGV2L2xpY2Vuc2VzXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBUT04gREVWIHNvZnR3YXJlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqL1xuLy8gQGZsb3dcblxuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbmNvbnN0IG9zID0gcmVxdWlyZSgnb3MnKTtcblxuY29uc3QgY29uZmlnID0ge1xuICAgIGF1dGg6IHtcbiAgICAgICAgYXV0aGNvbmZpZzoge1xuICAgICAgICAgICAgdXNlcm5hbWU6IHByb2Nlc3MuZW52LlRPTkRFVl9ESF9VU0VSLFxuICAgICAgICAgICAgcGFzc3dvcmQ6IHByb2Nlc3MuZW52LlRPTkRFVl9ESF9QQVNTV09SRCxcbiAgICAgICAgfVxuICAgIH0sXG4gICAgbG9jYWxOb2RlOiB7XG4gICAgICAgIGltYWdlOiAndG9ubGFicy9sb2NhbC1ub2RlOjAuMTEuMCcsXG4gICAgICAgIGNvbnRhaW5lcjogJ3RvbmxhYnMtbG9jYWwtbm9kZScsXG4gICAgfSxcbiAgICBjb21waWxlcnM6IHtcbiAgICAgICAgaW1hZ2U6ICd0b25sYWJzL2NvbXBpbGVyczowLjExLjAnLFxuICAgICAgICBjb250YWluZXI6ICd0b25sYWJzLWNvbXBpbGVyLWtpdCcsXG4gICAgICAgIG1vdW50U291cmNlOiBwYXRoLmpvaW4ob3MuaG9tZWRpcigpLCAnLnRvbmxhYnMnLCAnY29tcGlsZXJzJywgJ3Byb2plY3RzJyksXG4gICAgICAgIG1vdW50RGVzdGluYXRpb246ICcvcHJvamVjdHMnLFxuXG4gICAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuXG5cbiJdfQ==