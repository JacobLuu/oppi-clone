LOGIN - LOGOUT: use authSaga

LOGIN:
- call login API to get token + user info
- set token to local storage
- redirect to poll list 

LOGOUT:
- clear token from local storage
- redirect to login page

B1: authSlice là nơi cung cấp action và reducer
B2: authSaga định nghĩa các effect