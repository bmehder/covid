<script>
  $: value = "";
  $: console.log(value);

  let promise = getData();

  async function getData() {
    const res = await fetch(
      `https://raw.githubusercontent.com/bmehder/projects/master/json/covid.json`
    );
    const data = await res.json();

    data.forEach((item, i) => {
      if (item.rating <= 33) {
        data[i].color = "red";
      } else if (item.rating >= 33 && item.rating <= 66) {
        data[i].color = "yellow";
      } else {
        data[i].color = "green";
      }
    });

    if (res.ok) {
      return data;
    } else {
      throw new Error(data);
    }
  }

  const showDetails = i => {
    const info = document.querySelectorAll(".info");
    info[i].classList.toggle("open");
  };
</script>

<style>
  .loading {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  .container {
    line-height: 1.5em;
    max-width: 960px;
    margin: auto;
  }
  h1 {
    margin: 1.5em auto 0;
    text-align: center;
  }
  .search {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1.5em 0 2.5em;
  }
  input {
    width: 300px;
    padding: 1em;
  }
  input:focus {
    outline: none;
  }
  li {
    display: flex;
    margin: 1.5em 0;
    height: 3em;
  }
  .business {
    min-width: 200px;
    margin-right: 1em;
  }
  .rating {
    text-align: center;
    line-height: 3em;
    color: #000;
    font-weight: bold;
    border-radius: 10px;
    box-shadow: 16px 16px 32px rgba(0, 0, 0, 0.7),
      -16px -16px 32px rgba(255, 255, 255, 0.2) inset;
    border: 1px solid rgba(0, 0, 0, 1);
  }
  .info {
    display: none;
    background: white;
    margin: 2em 0em;
    padding: 0.5em 2em;
    border-radius: 10px;
    font-size: 18px;
    color: #333;
    box-shadow: 16px 16px 32px rgba(0, 0, 0, 0.7),
      -16px -16px 32px rgba(255, 255, 255, 0.2) inset;
    border: 1px solid rgba(0, 0, 0, 1);
  }
  .info p {
    margin: 1em auto;
  }
</style>

<h1>AVL COVID-19 Response Quality</h1>

<div class="search">
  <input id="filter" type="text" bind:value placeholder="Filter items..." />
</div>

{#await promise}

  <p class="loading">...loading</p>

{:then data}

  <div class="container">
    <ul>
      {#each data as business, i}
        {#if data[i].business
          .toLowerCase()
          .includes(value) || data[i].business.includes(value)}
          <li on:click={() => showDetails(i)}>
            <div class="business">
              <strong>{data[i].business}</strong>
              <br />
              <small>{data[i].address}</small>
            </div>
            <div
              class="rating {data[i].color}"
              style="width:{data[i].rating * 6}px">
              {data[i].rating}%
            </div>
          </li>
          <div class="info">
            <p>
              <strong>Category:</strong>
              {data[i].cat}
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec
              ligula quis enim egestas tempus at sed ante. Cras quis augue
              suscipit lorem pellentesque egestas ac eget ligula. Mauris feugiat
              nisi blandit bibendum tincidunt. Integer placerat, arcu sit amet
              feugiat ultricies, diam enim sagittis diam, eu laoreet eros arcu
              in metus. Cras sed enim vel urna auctor tempor. Mauris condimentum
              facilisis commodo. Donec a nibh vel lacus rutrum elementum at ut
              mauris.
            </p>
          </div>
        {/if}
      {/each}
    </ul>
  </div>

{:catch error}

  <p>Something has gone horribly wrong. :-(</p>
  <p style="color: red">{error.message}</p>

{/await}
