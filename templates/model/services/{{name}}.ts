export function tempCall() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        success: true,
        status: 200,
        data: {
          // account: 'user1',
        }
      })
    }, 1000);
  });
}
