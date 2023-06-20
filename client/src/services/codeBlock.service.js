export const codeBlockService = {
  query,
  getById,
};

async function query() {
  // Simulate an asynchronous operation, such as fetching data from an API
  return new Promise((resolve) => {
    setTimeout(() => {
      const codeBlocks = [
        {
          id: '1',
          title: 'Async Case',
          code: `
          async function getResults() {
            try {
              // Fill in code here to fetch data from an API
            } catch (error) {
              console.error('Error:', error);
            }
          }
        `,
        },
        {
          id: '2',
          title: 'Filter Case',
          code: `
          const numbers = [1, 2, 3, 4, 5, 6];
          const evenNumbers = numbers.filter(number => {
            // Fill in code here to return only even numbers
          });
        `,
        },
        {
          id: '3',
          title: 'Map Case',
          code: `
          const numbers = [1, 2, 3, 4, 5];
          const squares = numbers.map(number => {
            // Fill in code here to return the square of each number
          });
        `,
        },
        {
          id: '4',
          title: 'Reduce Case',
          code: `
          const numbers = [1, 2, 3, 4, 5];
          const sum = numbers.reduce((accumulator, currentNumber) => {
            // Fill in code here to return the sum of all numbers
          }, 0);
        `,
        },
      ];
      resolve(codeBlocks);
    }, 1000); // Simulate a delay of 1 second
  });
}
async function getById(codeBlockId) {
  // Simulate an asynchronous operation, such as fetching data from an API
  return new Promise((resolve) => {
    setTimeout(() => {
      const codeBlocks = [
        {
          id: '1',
          title: 'Async Case',
          code: `
            async function getResults() {
              try {
                // Fill in code here to fetch data from an API
              } catch (error) {
                console.error('Error:', error);
              }
            }
          `,
        },
        {
          id: '2',
          title: 'Filter Case',
          code: `
            const numbers = [1, 2, 3, 4, 5, 6];
            const evenNumbers = numbers.filter(number => {
              // Fill in code here to return only even numbers
            });
          `,
        },
        {
          id: '3',
          title: 'Map Case',
          code: `
            const numbers = [1, 2, 3, 4, 5];
            const squares = numbers.map(number => {
              // Fill in code here to return the square of each number
            });
          `,
        },
        {
          id: '4',
          title: 'Reduce Case',
          code: `
            const numbers = [1, 2, 3, 4, 5];
            const sum = numbers.reduce((accumulator, currentNumber) => {
              // Fill in code here to return the sum of all numbers
            }, 0);
          `,
        },
      ];

      const foundCodeBlock = codeBlocks.find(
        (block) => block.id === codeBlockId
      );
      resolve(foundCodeBlock);
    }, 1000); // Simulate a delay of 1 second
  });
}
