const showBookingResoldsBtn = document.getElementById('showBookingResoldsBtn');
const bookingResoldsContainer = document.getElementById(
  'bookingResoldsContainer',
);
const transactionHashInput = document.getElementById('transactionHash');

showBookingResoldsBtn.addEventListener('click', async () => {
  const transactionHash = transactionHashInput.value;

  try {
    const response = await fetch(
      `http://localhost:3000/graphql/booking-resolds?transactionHash=${transactionHash}`,
    );
    const bookingResolds = await response.json();

    bookingResoldsContainer.innerHTML = '';

    if (bookingResolds.length > 0) {
      const ul = document.createElement('ul');

      bookingResolds.forEach((resold) => {
        const li = document.createElement('li');
        li.innerHTML = `
          <p>ID: ${resold.id}</p>
          <p>Owner: ${resold.owner}</p>
          <p>Seller: ${resold.seller}</p>
          <p>Bidding: ${resold.bidding}</p>
          <p>Sold: ${resold.sold}</p>
          <p>Splittable: ${resold.splittable}</p>
          <p>Starting Price: ${resold.startingPrice}</p>
          <p>Token ID: ${resold.tokenId}</p>
          <p>Transaction Hash: ${resold.transactionHash}</p>
        `;
        ul.appendChild(li);
      });

      bookingResoldsContainer.appendChild(ul);
    } else {
      bookingResoldsContainer.textContent =
        'No booking resolds found for the given transaction hash.';
    }
  } catch (error) {
    console.error('Error fetching booking resolds:', error);
  }
});
