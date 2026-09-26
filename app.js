/*
  FreshFind — Main JavaScript

  Is file mein website ki interactions aur animations handle hoti hain.
  Product aur market ka data data.json se load hota hai.
*/


// data.json se website ka sara required data load kar rahe hain.
fetch("data.json")
  .then(response => {

    // Agar JSON file load nahi hoti to error show hoga.
    if (!response.ok) {
      throw new Error("data.json load nahi ho saka.");
    }

    return response.json();
  })

  .then(DATA => {

    // DATA ko short naam D ke through use karenge.
    const D = DATA;


    /*BASIC HELPERS
       Choti reusable functions jo neeche multiple jagah use hoti hain.*/


    // Kisi bhi CSS selector se element select karne ke liye shortcut.
    const $ = s =>
      document.querySelector(s);


    // Value ko minimum aur maximum range ke andar rakhne ke liye.
    const clamp = (v, a, b) =>
      Math.min(b, Math.max(a, v));


    // Do values ke darmiyan smooth/intermediate value nikalta hai.
    const lerp = (a, b, t) =>
      a + (b - a) * t;


    // Animation ke liye value ko smoothly start aur end karne mein help karta hai.
    const smooth = t =>
      t * t * (3 - 2 * t);


    /*NAVIGATION
       JSON se navigation links create karke navbar mein add karte hain.*/


    $('#nav').innerHTML =
      D.nav.map(n =>
        `<a data-s="${n.s}" data-action="${n.action || ''}">${n.t}</a>`
      ).join('');


    /*FEATURE PANELS
       Features ke liye reusable HTML panel banaya ja raha hai.*/


    // JSON ke features ko short variable mein store kar rahe hain.
    const F = D.features;


    // Har feature ke liye same layout ka panel generate hota hai.
    const panel = f => `

  <div class="panel">

    <div>

      <div class="ic">
        ${f.icon}
      </div>

      <h4>
        ${f.title}
      </h4>

      <p>
        ${f.p}
      </p>

    </div>


    <div>

      ${
        // Agar feature ke paas image hai to image show hogi.
        f.img

          ? `<div
              class="feature-image"
              style="
                background-image:url('${f.img}');
              ">
            </div>`

          // Agar image nahi hai to text/big content show hoga.
          : `<div class="big2">
              ${f.big.join('<br>')}
            </div>`
      }

    </div>

  </div>


  <div class="fm">

    ${f.foot}

    <br>

    ${f.sub}

    <i>
      ${f.formula}
    </i>

  </div>

`;


    // Sustainability section ka data.
    const SU = D.sustain;

    /*MAIN PAGE HTML
       Yahan website ke major sections ka HTML dynamically create hota hai.*/


    $('#stage').innerHTML = `

    <!-- HERO SECTION -->
    <section class="sc s0">

      <h1 class="big">
        ${D.hero.title}
      </h1>

      <p class="tag">
        ${D.tag}
      </p>

      <div class="glass">

        <div>
          ${D.hero.card.join('<br>')}
        </div>

        <small>
          ${D.hero.cardSub}
        </small>

        <button
          class="market-open-btn"
          id="heroMarketBtn">

          FIND YOUR MARKET →

        </button>

      </div>

      <p class="side">
        ${D.hero.p}
      </p>

      <div class="tab">
        ${D.hero.tab}
      </div>

      <div class="more">
        Scroll to continue
      </div>

    </section>


    <!-- INTRO SECTION -->
    <section class="sc s1 dark">

      <h2>
        ${D.intro.left.join('<br>')}
      </h2>

      <p>
        ${D.intro.right}
      </p>

      <div class="note">
        ${D.intro.note}
      </div>

    </section>


    <!-- POWER / INFORMATION SECTION -->
    <section class="sc s2 dark">

      <h2>
        ${D.power.title}
      </h2>

     
      <div class="h">
        ${D.power.hint || ""}
      </div>

      <div class="t">
        ${D.power.text.join('<br>')}
      </div>

      <div class="note">
        ${D.power.note}
      </div>

      <div class="glow"></div>

    </section>


    <!-- GALLERY SECTION -->
    <section class="sc s3 dark">

      <div class="cap">

        ${D.gallery.a}

        <b>
          ${D.gallery.b}
        </b>

      </div>

      <div class="frame"></div>

      <!-- Gallery images aur videos yahan render hote hain -->

      ${
        D.gallery.items.map(i => {

          // File extension check karke pata lagate hain
          // ke current item image hai ya video.
          const isVideo =
            i.src.toLowerCase().endsWith(".mp4");

          return isVideo

            // Agar MP4 hai to video element create hoga.
            ? `<div
                class="tile"
                style="background-color:${i.c};">

                <video
                  src="${i.src}"
                  autoplay
                  muted
                  loop
                  playsinline
                  preload="auto">
                </video>

              </div>`

            // Warna normal image background ke taur par use hogi.
            : `<div
                class="tile"
                style="
                  background-color:${i.c};
                  background-image:url('${i.src}');
                ">
              </div>`;

        }).join('')
      }

      <div class="more">
        Scroll to continue
      </div>

    </section>


    <!-- FIRST FEATURE PANEL -->
    <section class="sc f0">
      ${panel(F[0])}
    </section>


    <!-- SECOND FEATURE PANEL -->
    <section class="sc f1">
      ${panel(F[1])}
    </section>


    <!-- SUSTAINABILITY SECTION -->
    <section class="sc cream">

      <small class="k">
        ${SU.small}
      </small>

      <h2 class="word">
        ${SU.word}
      </h2>

      <p class="sp">
        ${SU.p}
      </p>

      <div class="cards">

        ${
          // Sustainability ke cards JSON se dynamically generate hote hain.
          SU.cards.map(c => `

            <div class="card">

              <b>
                ${c.h}
              </b>

              <span>
                ${c.p}
              </span>

              ${
                // Agar card mein extra note available hai to show karenge.
                c.n
                ? `<i>${c.n}</i>`
                : ''
              }

            </div>

          `).join('')
        }

      </div>

    </section>


    <!-- FRESH PRODUCTS / MARKET SECTION -->
    <section class="sc s7">

      <div class="products-head">

        <div class="products-title">

          <small>
            FRESHFIND MARKET
          </small>

          <h2>
          <br>
            FRESH  PRODUCTS
          </h2>

         

        </div>


        <div class="product-status">

          <span class="status-dot"></span>

          <span>
            MARKET LIST LIVE
          </span>

        </div>

      </div>


      <!-- Product count aur category filters -->
      <div class="product-tools">

        <span class="product-count">
          ${D.products.length} PRODUCTS / TODAY
        </span>


        <div class="product-filters">

          <!-- Sab products show karne wala default filter -->
          <button
            class="product-filter active"
            data-filter="all">
            ALL
          </button>

          <!-- Sirf vegetables show karne ke liye -->
          <button
            class="product-filter"
            data-filter="VEGETABLE">
            VEGETABLES
          </button>

          <!-- Root vegetables ke liye -->
          <button
            class="product-filter"
            data-filter="ROOT VEGETABLE">
            ROOT
          </button>

          <!-- Leafy greens ke liye -->
          <button
            class="product-filter"
            data-filter="LEAFY GREEN">
            GREENS
          </button>

        </div>

      </div>


      <!-- Product cards yahan dynamically create hote hain -->
      <div class="product-grid">

        ${
          D.products.map((p, i) => `

            <article
              class="product-card"
              data-product="${i}"
              data-category="${p.category}">

              <div
                class="product-img"
                style="
                  background-image:url('${p.img}');
                ">

                <span class="product-badge">
                  ${p.badge}
                </span>

                <span class="product-season">
                  ${p.season}
                </span>

              </div>


              <div class="product-info">

                <!-- Product ka serial number -->
                <span class="product-number">
                  ${String(i + 1).padStart(2, '0')}
                </span>

                <span class="product-category">
                  ${p.category}
                </span>

                <b>
                  ${p.n}
                </b>

                <small>
                  ${p.d}
                </small>


                <div class="product-bottom">

                  <span class="price">
                    ${p.price}
                  </span>

                  <button class="product-more">
                    VIEW DETAILS
                  </button>

                </div>

              </div>

            </article>

          `).join('')
        }

      </div>

    </section>


    <!-- SEASONAL GUIDE SECTION -->
    <section class="sc season-section">

      <div class="season-head">

        <div class="season-heading">

          <small>
            SEASONAL GUIDE
          </small>

          <h2>
            IN SEASON
          </h2>

          <p>
            Discover what is growing, fresh and worth picking
            throughout the year.
          </p>

        </div>


        <!-- Current season ka short information -->
        <div class="season-current">

          <small>
            CURRENTLY
          </small>

          <strong>
            AUTUMN
          </strong>

          <span>
            SEP — NOV
          </span>

        </div>

      </div>


      <!-- Different seasons ke cards -->
      <div class="season-grid">

        ${
          D.seasons.map((s, i) => `

            <article
              class="season-card"
              data-season="${i}">

              <div
                class="season-img"
                style="
                  background-image:url('${s.img}');
                ">

                <span class="season-number">
                  ${String(i + 1).padStart(2, '0')}
                </span>

              </div>


              <span class="season-tag">
                ${s.tag}
              </span>


              <h3>
                ${s.name}
              </h3>


              <p>
                ${s.p}
              </p>


              <div class="season-explore">

                <span>
                  EXPLORE SEASON
                </span>

                <span>
                  →
                </span>

              </div>

            </article>

          `).join('')
        }

      </div>


      <!-- Abhi fresh products ka quick list -->
      <div class="fresh-strip">

        <strong>
          WHAT'S FRESH NOW
        </strong>

        <div class="fresh-items">

          <span class="fresh-item">
            TOMATO
          </span>

          <span class="fresh-item">
            CARROT
          </span>

          <span class="fresh-item">
            SPINACH
          </span>

          <span class="fresh-item">
            CAPSICUM
          </span>

          <span class="fresh-item">
            POTATO
          </span>

        </div>

      </div>

    </section>


        /*MARKET FINDER
       User yahan area aur produce select karke matching markets dekh sakta hai*/

    <div class="market-overlay" id="marketOverlay">

      <div class="market-box">

        <div class="market-top">

          <div>

            <span class="market-kicker">
              FRESHFIND DIRECTORY
            </span>

            <h2>
              FIND A MARKET
            </h2>

            <p>
              Choose your area and the produce you want.
              FreshFind will show matching farmers markets,
              their timings, location and available produce.
            </p>

          </div>

          <!-- Market finder ko close karne ka button -->
          <button
            class="market-close"
            id="marketClose">
            ×
          </button>

        </div>


        <!-- Area aur produce ke filters -->
        <div class="market-controls">

          <select
            class="market-select"
            id="marketArea">

            <option value="all">
              All Areas
            </option>

          </select>


          <select
            class="market-select"
            id="marketProduce">

            <option value="all">
              Any Produce
            </option>

          </select>


          <!-- Selected filters ke according markets search karega -->
          <button
            class="market-search"
            id="marketSearch">

            FIND MARKETS

          </button>


          <!-- User ke saved markets open karne ke liye -->
          <button
            class="saved-markets-btn"
            id="savedMarkets">

            SAVED MARKETS

          </button>

        </div>


        <!-- Search results JavaScript ke through yahan add honge -->
        <div
          class="market-results"
          id="marketResults">
        </div>

      </div>

    </div>


    <!-- MARKET DETAIL
         Kisi market ko select karne ke baad uski complete information yahan show hoti hai. -->

    <div
      class="market-detail-overlay"
      id="marketDetailOverlay">

      <div class="market-detail-box">

        <!-- Detail popup close karne ka button -->
        <button
          class="market-close detail-close"
          id="marketDetailClose">

          ×

        </button>

        <span
          class="market-detail-area"
          id="detailArea">
        </span>

        <h2 id="detailName"></h2>

        <p
          class="market-detail-location"
          id="detailLocation">
        </p>


        <!-- Market ki basic information -->
        <div class="detail-grid">

          <div class="detail-box">
            <small>OPENING DAYS</small>
            <strong id="detailDays"></strong>
          </div>

          <div class="detail-box">
            <small>TIMING</small>
            <strong id="detailTime"></strong>
          </div>

          <div class="detail-box">
            <small>AUDIENCE</small>
            <strong id="detailAudience"></strong>
          </div>

          <div class="detail-box">
            <small>MARKET STATUS</small>
            <strong>FARMERS MARKET</strong>
          </div>

        </div>


        <!-- Is market mein available vegetables/products -->
        <div class="detail-section">

          <h4>
            AVAILABLE PRODUCE
          </h4>

          <div
            class="detail-produce"
            id="detailProduce">
          </div>

        </div>


        <!-- Market save karne ya map open karne ke buttons -->
        <div class="detail-buttons">

          <button id="detailSave">
            SAVE MARKET
          </button>

          <button id="detailMap">
            OPEN MAP
          </button>

        </div>

      </div>

    </div>


    <!-- HARVEST DRAWER
         User ke selected products/cart ki information yahan hoti hai. -->

    <aside
      class="harvest-drawer"
      id="harvestDrawer">

      <div class="drawer-head">

        <div>

          <small>
            FRESHFIND SHOPPING
          </small>

          <h2>
            YOUR HARVEST
          </h2>

        </div>

        <!-- Harvest drawer close karne ke liye -->
        <button
          class="drawer-close"
          id="harvestClose">

          ×

        </button>

      </div>


      <!-- Added products JavaScript se yahan show honge -->
      <div
        class="harvest-items"
        id="harvestItems">
      </div>


      <div class="harvest-footer">

        <div class="harvest-total">

          <span>
            TOTAL
          </span>

          <strong id="harvestTotal">
            Rs. 0
          </strong>

        </div>


        <!-- Product kis market se related hai wo dekhne ke liye -->
        <button
          class="source-btn"
          id="harvestSource">

          VIEW MARKET SOURCE →

        </button>


        <!-- Checkout screen open karta hai -->
        <button
          class="checkout-btn"
          id="checkoutOpen">

          CHECKOUT →

        </button>

      </div>

    </aside>


    <!-- Drawer open hone par background ko dim karne ke liye -->
    <div
      class="drawer-backdrop"
      id="drawerBackdrop">
    </div>


    <!-- FIELD NOTES
         User ke saved products aur seasons yahan store/show hote hain. -->

    <div
      class="notes-overlay"
      id="notesOverlay">

      <div class="notes-box">

        <!-- Field Notes close button -->
        <button
          class="market-close"
          id="notesClose">

          ×

        </button>

        <span class="market-kicker">
          YOUR SAVED PICKS
        </span>

        <h2>
          FIELD NOTES
        </h2>

        <p>
          Products and seasons you kept for later.
        </p>

        <!-- Saved items JavaScript se dynamically add honge -->
        <div
          id="notesItems"
          class="notes-items">
        </div>

      </div>

    </div>


    <!-- CHECKOUT
         User yahan order ki basic details enter karta hai. -->

    <div
      class="checkout-overlay"
      id="checkoutOverlay">

      <div class="checkout-box">

        <!-- Checkout close button -->
        <button
          class="market-close"
          id="checkoutClose">

          ×

        </button>

        <span class="market-kicker">
          FRONTEND DEMO
        </span>

        <h2>
          CHECKOUT
        </h2>


        <form
          id="checkoutForm"
          class="checkout-form">

          <!-- Customer ka naam -->
          <input
            required
            id="checkoutName"
            placeholder="Full name">


          <!-- Customer ka email -->
          <input
            required
            id="checkoutEmail"
            type="email"
            placeholder="Email / Gmail">


          <!-- Contact number -->
          <input
            required
            id="checkoutPhone"
            type="tel"
            placeholder="Phone number">


          <!-- Delivery address -->
          <input
            required
            id="checkoutAddress"
            placeholder="Delivery address">


          <!-- Default city Karachi rakhi gayi hai -->
          <input
            required
            id="checkoutCity"
            value="Karachi"
            placeholder="City">


          <!-- User optional note bhi add kar sakta hai -->
          <textarea
            id="checkoutNote"
            placeholder="Optional note">
          </textarea>


          <!-- Order ka summary yahan show hoga -->
          <div
            class="checkout-summary"
            id="checkoutSummary">
          </div>


          <!-- Form submit karne ka button -->
          <button
            class="checkout-submit"
            type="submit">

            PLACE HARVEST ORDER →

          </button>


          <!-- Submit hone ke baad message yahan show hoga -->
          <p
            class="checkout-message"
            id="checkoutMessage">
          </p>

        </form>

      </div>

    </div>


    <!-- CONTACT SECTION -->

    <section
      class="sc s8"
      style="background:#120d09">

      <div class="contact-wrap">

        <div class="contact-copy">

          <small
            class="k"
            style="
              position:static;
              transform:none;
            ">

            GET IN TOUCH

          </small>


          <h2>
            CONTACT<br>
            US
          </h2>


          <p>
            Have a market, vegetable or suggestion to share?
            Send a message and the FreshFind team can add it
            to the directory.
          </p>

        </div>


        <!-- Contact form -->
        <form
          class="contact-form"
          id="contactForm">

          <input
            required
            placeholder="Your name">


          <input
            required
            type="email"
            placeholder="Email address">


          <textarea
            required
            placeholder="Your message">
          </textarea>


          <button type="submit">
            SEND MESSAGE
          </button>


          <!-- Form submit hone ke baad status/message yahan aayega -->
          <small
            id="formMsg"
            style="color:#f3a15c">
          </small>

        </form>

      </div>

    </section>

    `;


    /*PRODUCT MODAL
       Product card par click karne par detailed popup open hota hai.*/


    // Product detail popup ko JavaScript se create kar rahe hain.
    const modal = document.createElement('div');

    modal.className = 'modal';

    modal.innerHTML = `

      <div class="modal-box product-modal-box">

        <!-- Selected product ki image -->
        <div
          class="modal-img"
          id="modalImg">
        </div>


        <div class="modal-copy">

          <!-- Modal close button -->
          <button
            class="modal-close"
            id="modalClose">

            ×

          </button>


          <small id="modalTag">
            FRESHFIND PRODUCT
          </small>


          <!-- Product ka naam JavaScript se add hoga -->
          <h2 id="modalName"></h2>


          <!-- Product price -->
          <div
            class="modal-price"
            id="modalPrice">
          </div>


          <!-- Short product description -->
          <p id="modalDesc"></p>


          <!-- Product ki extra details -->
          <p
            id="modalDetail"
            style="margin-top:12px">
          </p>


          <!-- Season aur category jaisi information -->
          <div
            class="modal-meta"
            id="modalMeta">
          </div>


          <!-- Quantity control -->
          <div class="quantity-row">

            <span>
              QUANTITY
            </span>

            <div class="qty">

              <button id="qtyMinus">
                −
              </button>

              <strong id="qtyValue">
                1
              </strong>

              <button id="qtyPlus">
                +
              </button>

            </div>

          </div>


          <div class="modal-actions">

            <!-- Product ko harvest/cart mein add karne ke liye -->
            <button
              class="harvest-add"
              id="addHarvest">

              ADD TO HARVEST

            </button>


            <!-- Product ko Field Notes mein save karne ke liye -->
            <button
              class="save-product"
              id="saveProduct">

              KEEP FOR LATER ♡

            </button>

          </div>


          <!-- Selected product ka market find karne ke liye -->
          <button
            class="where-market"
            id="whereMarket">

            WHERE CAN I FIND IT? →

          </button>

        </div>

      </div>

    `;


    // Created modal ko page ke body mein add kar rahe hain.
    document.body.appendChild(modal);


    // Abhi ka selected product aur quantity track karne ke liye.
    let activeProductIndex = 0;
    let modalQty = 1;


    // Product ke price se sirf numeric amount nikalta hai.
    function productUnitPrice(p) {

      const match =
        String(p.price).match(/([0-9,]+)/);

      return match
        ? Number(match[1].replace(/,/g, ''))
        : 0;
    }


    // Number ko Pakistani rupee format mein display karta hai.
    function priceText(n) {

      return `Rs. ${n.toLocaleString('en-PK')}`;

    }


    /*FIELD NOTES STORAGE
       Saved products ko browser ke localStorage mein rakha jata hai.*/


    // Check karta hai ke product Field Notes mein saved hai ya nahi.
    function productIsSaved(i) {

      return getNotes().products.includes(i);

    }


    // LocalStorage se saved Field Notes read karta hai.
    function getNotes() {

      try {

        return JSON.parse(
          localStorage.getItem('ff-field-notes') ||
          '{"products":[],"seasons":[]}'
        );

      } catch(e) {

        // Agar stored data invalid ho to empty lists use hongi.
        return {
          products: [],
          seasons: []
        };

      }

    }


    // Updated Field Notes ko localStorage mein save karta hai.
    function setNotes(v) {

      try {

        localStorage.setItem(
          'ff-field-notes',
          JSON.stringify(v)
        );

      } catch(e) {}

    }


    // Product ko save ya unsave karta hai.
    function toggleProductNote(i) {

      const n = getNotes();

      const at =
        n.products.indexOf(i);


      // Agar product already saved hai to remove kar dete hain.
      if(at > -1) {

        n.products.splice(at, 1);

      } else {

        // Agar saved nahi hai to products list mein add kar dete hain.
        n.products.push(i);

      }


      // Changes ko save karke notes section refresh karte hain.
      setNotes(n);

      renderNotes();

    }


    /*OPEN PRODUCT
       Product card select hone par modal ki information update hoti hai.*/


    function openProduct(i) {

      // Selected product ka data JSON se le rahe hain.
      const p = D.products[i];

      activeProductIndex = i;
      modalQty = 1;


      // Modal mein product image set karna.
      $('#modalImg').style.backgroundImage =
        `url('${p.img}')`;

      // Product ka naam show karna.
      $('#modalName').textContent =
        p.n;

      // Product price show karna.
      $('#modalPrice').textContent =
        p.price;

      // Short description show karna.
      $('#modalDesc').textContent =
        p.d;

      // Detailed information show karna.
      $('#modalDetail').textContent =
        p.detail;

      // Season aur category ki information show karna.
      $('#modalMeta').textContent =
        `${p.season} · ${p.category} · FreshFind demo listing`;

      // Har new product ke liye quantity 1 se start hoti hai.
      $('#qtyValue').textContent =
        '1';

      // Button ka text saved status ke according change hota hai.
      $('#saveProduct').textContent =
        productIsSaved(i)
          ? 'SAVED TO FIELD NOTES ✓'
          : 'KEEP FOR LATER ♡';


      // Modal ko visible kar dete hain.
      modal.classList.add('show');

    }


    // Har product card par click event lagaya ja raha hai.
    document
      .querySelectorAll('.product-card')
      .forEach((card, i) => {

        card.addEventListener(
          'click',
          () =>
            openProduct(
              Number(card.dataset.product ?? i)
            )
        );

      });


    // Close button click hone par modal hide ho jata hai.
    $('#modalClose').onclick =
      () => modal.classList.remove('show');


    // Modal ke bahar click karne par bhi modal close ho jayega.
    modal.addEventListener(
      'click',
      e => {

        if(e.target === modal) {

          modal.classList.remove('show');

        }

      }
    );


    // Quantity ko 1 se neeche nahi jane deta.
    $('#qtyMinus').onclick = () => {

      modalQty =
        Math.max(1, modalQty - 1);

      $('#qtyValue').textContent =
        modalQty;

    };


    // Quantity maximum 20 tak increase ki ja sakti hai.
    $('#qtyPlus').onclick = () => {

      modalQty =
        Math.min(20, modalQty + 1);

      $('#qtyValue').textContent =
        modalQty;

    };


    // Product ko Field Notes mein save/unsave karta hai.
    $('#saveProduct').onclick = () => {

      toggleProductNote(
        activeProductIndex
      );

      // Button ka text current saved status ke according update hota hai.
      $('#saveProduct').textContent =
        productIsSaved(activeProductIndex)
          ? 'SAVED TO FIELD NOTES ✓'
          : 'KEEP FOR LATER ♡';

    };


    // Product modal close karke us product ka market finder open karta hai.
    $('#whereMarket').onclick = () => {

      modal.classList.remove('show');

      openMarketFinder({
        produce:
          D.products[activeProductIndex].n
      });

    };


    /*HARVEST STORAGE + DRAWER
       Harvest/cart ka data localStorage mein save hota hai.*/


    // Browser se current harvest list read karta hai.
    function getHarvest() {

      try {

        return JSON.parse(
          localStorage.getItem('ff-harvest') ||
          '[]'
        );

      } catch(e) {

        // Agar data read na ho sake to empty harvest return hota hai.
        return [];

      }

    }


    // Harvest ki updated list localStorage mein save karta hai.
    function setHarvest(v) {

      try {

        localStorage.setItem(
          'ff-harvest',
          JSON.stringify(v)
        );

      } catch(e) {}

    }


    // Product ko harvest mein add karta hai.
    function addToHarvest(i, qty = 1) {

      const h = getHarvest();

      const p = D.products[i];

      // Check karte hain ke product pehle se harvest mein hai ya nahi.
      const found =
        h.find(x => x.product === i);


      if(found) {

        // Agar product already hai to uski quantity increase karte hain.
        found.qty =
          Math.min(
            20,
            found.qty + qty
          );

      } else {

        // Agar product new hai to harvest list mein add karte hain.
        h.push({
          product: i,
          qty
        });

      }


      // Updated harvest save aur screen par refresh karte hain.
      setHarvest(h);

      updateHarvestUI();

      // Product image ko harvest icon ki taraf animate karta hai.
      flyToHarvest(i);

    }


    // Harvest se complete product remove karta hai.
    function removeFromHarvest(i) {

      setHarvest(
        getHarvest()
          .filter(x => x.product !== i)
      );

      updateHarvestUI();

    }


    // Harvest mein product ki quantity increase/decrease karta hai.
    function changeHarvestQty(i, d) {

      const h = getHarvest();

      const x =
        h.find(a => a.product === i);

      if(!x) return;


      // Quantity ko 1 se 20 ke beech rakha gaya hai.
      x.qty =
        Math.max(
          1,
          Math.min(
            20,
            x.qty + d
          )
        );


      setHarvest(h);

      updateHarvestUI();

    }


    // Harvest drawer ka count, total aur product list update karta hai.
    function updateHarvestUI() {

      const h =
        getHarvest();


      // Har product ki price × quantity karke total calculate hota hai.
      const total =
        h.reduce(
          (sum, x) =>
            sum +
            productUnitPrice(
              D.products[x.product]
            ) * x.qty,
          0
        );


      // Harvest icon par total quantity show hoti hai.
      $('#harvestCount').textContent =
        String(
          h.reduce(
            (sum, x) =>
              sum + x.qty,
            0
          )
        ).padStart(2, '0');


      // Total price update karte hain.
      $('#harvestTotal').textContent =
        priceText(total);


      const box =
        $('#harvestItems');


      // Agar harvest empty hai to message show karte hain.
      if(!h.length) {

        box.innerHTML =
          '<div class="harvest-empty">Your harvest is empty.<br>Add a vegetable from the product directory.</div>';

        return;

      }


      // Harvest ke andar har selected product ka card create hota hai.
      box.innerHTML =
        h.map(x => {

          const p =
            D.products[x.product];


          return `

            <div class="harvest-item">

              <div
                class="harvest-thumb"
                style="
                  background-image:url('${p.img}')
                ">
              </div>


              <div class="harvest-copy">

                <strong>
                  ${p.n}
                </strong>

                <small>
                  ${p.price} · ${p.season}
                </small>


                <div class="harvest-qty">

                  <!-- Quantity decrease -->
                  <button
                    data-hq="minus"
                    data-id="${x.product}">
                    −
                  </button>

                  <b>
                    ${x.qty}
                  </b>

                  <!-- Quantity increase -->
                  <button
                    data-hq="plus"
                    data-id="${x.product}">
                    +
                  </button>

                  <!-- Product ko harvest se remove karna -->
                  <button
                    class="remove-harvest"
                    data-hq="remove"
                    data-id="${x.product}">
                    REMOVE
                  </button>

                </div>

              </div>

            </div>

          `;

        }).join('');


      // Quantity aur remove buttons ke click events set karte hain.
      box
        .querySelectorAll('[data-hq]')
        .forEach(b => {

          b.onclick = () => {

            const id =
              Number(b.dataset.id);


            if(b.dataset.hq === 'remove') {

              // Remove button press hone par product delete hota hai.
              removeFromHarvest(id);

            } else {

              // Plus/minus ke according quantity change hoti hai.
              changeHarvestQty(
                id,
                b.dataset.hq === 'plus'
                  ? 1
                  : -1
              );

            }

          };

        });

    }


    /*HARVEST ANIMATION
       Product add karne par image harvest icon ki taraf fly karti hai.*/


    function flyToHarvest(i) {

      // Current product card find karte hain.
      const card =
        document.querySelector(
          `.product-card[data-product="${i}"]`
        );

      // Harvest icon ko animation ka target banate hain.
      const target =
        $('#harvestToggle');


      if(!card || !target) return;


      const img =
        card.querySelector('.product-img');

      if(!img) return;


      // Temporary element create hota hai jo flying image ka kaam karta hai.
      const fly =
        document.createElement('div');

      fly.className =
        'harvest-fly';

      fly.style.backgroundImage =
        img.style.backgroundImage;


      // Product image aur harvest icon ki screen positions nikalte hain.
      const a =
        img.getBoundingClientRect();

      const b =
        target.getBoundingClientRect();


      fly.style.left =
        a.left + 'px';

      fly.style.top =
        a.top + 'px';


      document.body.appendChild(fly);


      // Animation ke end mein image harvest icon ki taraf move hoti hai.
      requestAnimationFrame(() => {

        fly.style.left =
          (b.left + b.width / 2 - 22) + 'px';

        fly.style.top =
          (b.top + b.height / 2 - 22) + 'px';

        fly.style.transform =
          'scale(.2)';

        fly.style.opacity =
          '0';

      });


      // Animation complete hone ke baad temporary element remove kar dete hain.
      setTimeout(
        () => fly.remove(),
        700
      );


      // Harvest icon ko ek short pop animation dene ke liye class reset karte hain.
      target.classList.remove(
        'harvest-pop'
      );

      void target.offsetWidth;

      target.classList.add(
        'harvest-pop'
      );

    }


    // Modal se product ko harvest mein add karta hai.
    $('#addHarvest').onclick = () => {

      addToHarvest(
        activeProductIndex,
        modalQty
      );

      modal.classList.remove('show');

    };


    // Harvest drawer open karta hai.
    $('#harvestToggle').onclick = () => {

      $('#harvestDrawer')
        .classList.add('show');

      $('#drawerBackdrop')
        .classList.add('show');

      updateHarvestUI();

    };


    // Harvest drawer aur uska background close karta hai.
    function closeHarvest() {

      $('#harvestDrawer')
        .classList.remove('show');

      $('#drawerBackdrop')
        .classList.remove('show');

    }


    $('#harvestClose').onclick =
      closeHarvest;

    $('#drawerBackdrop').onclick =
      closeHarvest;

    /*MARKET FINDER FUNCTIONS
       Ye functions market finder ko open, close aur filter karne
       ka kaam karte hain.*/


    // Market finder popup ko open karta hai.
    // Agar kisi specific area ya vegetable ki preference aaye
    // to woh filter bhi pehle se select kar deta hai.
    function openMarketFinder(pref = {}) {

      $('#marketOverlay')
        .classList.add('show');


      // Agar area diya gaya ho to area select kar do.
      if(pref.area) {

        $('#marketArea').value =
          pref.area;

      }


      // Agar produce diya gaya ho to vegetable select kar do.
      if(pref.produce) {

        $('#marketProduce').value =
          pref.produce;

      }


      // Selected filters ke according markets show karo.
      renderMarkets();

    }


    // Market finder popup close karta hai.
    function closeMarketFinder() {

      $('#marketOverlay')
        .classList.remove('show');

    }


    // Markets ko filter karke screen par display karta hai.
    function renderMarkets(savedOnly = false) {

      const area =
        $('#marketArea').value;

      const produce =
        $('#marketProduce').value;


      // Area, produce aur saved status ke according
      // matching markets filter kiye ja rahe hain.
      const rows =
        D.markets.filter(
          m =>
            (savedOnly
              ? isSaved(m.id)
              : true
            ) &&
            (area === 'all' ||
              m.area === area
            ) &&
            (produce === 'all' ||
              m.produce.includes(produce)
            )
        );


      // Agar matching markets mil jayein to unke cards banao.
      // Warna empty message show karo.
      $('#marketResults').innerHTML =
        rows.length

          ? rows.map(m => `

              <article class="market-card">

                <div class="market-card-head">

                  <div>

                    <span>
                      ${m.area}
                    </span>

                    <h3>
                      ${m.name}
                    </h3>

                  </div>


                  <!-- Market ko save/unsave karne ka button -->
                  <button
                    class="market-save"
                    data-save="${m.id}">

                    ${isSaved(m.id)
                      ? '★'
                      : '☆'}

                  </button>

                </div>


                <!-- Market ki location, days aur timing -->
                <p class="market-info">

                  ${m.location} ·
                  ${m.days} ·
                  ${m.time}

                </p>


                <!-- Is market mein available produce -->
                <div class="market-produce">

                  ${
                    m.produce
                      .map(x =>
                        `<span>${x}</span>`
                      )
                      .join('')
                  }

                </div>


                <div class="market-actions">

                  <!-- Market ki complete details open karega -->
                  <button
                    data-detail="${m.id}">
                    VIEW MARKET
                  </button>

                  <!-- Market ko map par open karega -->
                  <button
                    data-map="${m.id}">
                    MAP →
                  </button>

                </div>

              </article>

            `).join('')

          : `

            <!-- Jab koi market filter se match na kare -->
            <div class="market-empty">

              No matching markets found.
              Try another area or vegetable.

            </div>

          `;


      // Har VIEW MARKET button par click event lagate hain.
      $('#marketResults')
        .querySelectorAll('[data-detail]')
        .forEach(b => {

          b.onclick =
            () =>
              openMarketDetails(
                b.dataset.detail
              );

        });


      // Har MAP button ko selected market ka map open karne se connect karte hain.
      $('#marketResults')
        .querySelectorAll('[data-map]')
        .forEach(b => {

          b.onclick =
            () =>
              openMarketMap(
                b.dataset.map
              );

        });


      // Har save button ko bookmark function se connect karte hain.
      $('#marketResults')
        .querySelectorAll('[data-save]')
        .forEach(b => {

          b.onclick = () => {

            toggleBookmark(
              b.dataset.save
            );

            // Save/unsave ke baad list dobara render hoti hai.
            renderMarkets(
              savedOnly
            );

          };

        });

    }


    /*MARKET DETAILS
       Selected market ki complete information detail popup mein
       show hoti hai.*/


    function openMarketDetails(id) {

      // ID ke through selected market ka data find karte hain.
      const m =
        D.markets.find(
          x => x.id === id
        );


      // Agar market nahi mila to function yahin stop ho jata hai.
      if(!m) return;


      // Currently selected market ki ID save karte hain.
      activeMarketId =
        id;


      // Market ki details popup ke different elements mein fill karte hain.
      $('#detailArea').textContent =
        m.area;

      $('#detailName').textContent =
        m.name;

      $('#detailLocation').textContent =
        m.location;

      $('#detailDays').textContent =
        m.days;

      $('#detailTime').textContent =
        m.time;

      $('#detailAudience').textContent =
        m.audience;


      // Available produce ko individual tags ki form mein show karte hain.
      $('#detailProduce').innerHTML =
        m.produce
          .map(x =>
            `<span>${x}</span>`
          )
          .join('');


      // Save button ka text market ke current saved status ke according change hota hai.
      $('#detailSave').textContent =
        isSaved(id)
          ? 'REMOVE FROM SAVED'
          : 'SAVE MARKET';


      // Market detail popup ko visible karte hain.
      $('#marketDetailOverlay')
        .classList.add('show');

    }


    // Market details popup close karta hai.
    function closeMarketDetails() {

      $('#marketDetailOverlay')
        .classList.remove('show');

    }


    // FIND MARKETS button normal filtered results show karta hai.
    $('#marketSearch').onclick =
      () => renderMarkets(false);


    // SAVED MARKETS button sirf saved markets show karta hai.
    $('#savedMarkets').onclick =
      () => renderMarkets(true);


    // Market finder close button.
    $('#marketClose').onclick =
      closeMarketFinder;


    // Market details close button.
    $('#marketDetailClose').onclick =
      closeMarketDetails;


    // Detail popup ke andar market ko save ya unsave karta hai.
    $('#detailSave').onclick = () => {

      if(!activeMarketId) return;


      toggleBookmark(
        activeMarketId
      );


      // Save status ke according button text update hota hai.
      $('#detailSave').textContent =
        isSaved(activeMarketId)
          ? 'REMOVE FROM SAVED'
          : 'SAVE MARKET';

    };


    // Detail popup se directly market ka map open kar sakte hain.
    $('#detailMap').onclick = () => {

      if(activeMarketId) {

        openMarketMap(
          activeMarketId
        );

      }

    };


    /*GOOGLE MAP
       Selected market ki location Google Maps mein open hoti hai.*/


    function openMarketMap(id) {

      // Selected market ka data find karte hain.
      const m =
        D.markets.find(
          x => x.id === id
        );


      if(!m) return;


      // Market name aur location ko Google Maps search query mein convert karte hain.
      const q =
        encodeURIComponent(
          m.name + ' ' + m.location
        );


      // Google Maps ko new browser tab mein open karte hain.
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${q}`,
        '_blank'
      );

    }


    /*MARKET FILTER OPTIONS
       JSON data se area aur produce ke dropdown options
       automatically create hote hain.*/


    function populateMarketFilters() {

      // Available market areas ko area dropdown mein add karte hain.
      $('#marketArea').innerHTML =
        '<option value="all">All Areas</option>' +

        [
          ...new Set(
            D.markets.map(
              m => m.area
            )
          )
        ]

          .map(
            a => `<option>${a}</option>`
          )

          .join('');


      // Markets mein available vegetables ko produce dropdown mein add karte hain.
      $('#marketProduce').innerHTML =
        '<option value="all">Any Produce</option>' +

        [
          ...new Set(
            D.markets.flatMap(
              m => m.produce
            )
          )
        ]

          .sort()

          .map(
            x => `<option>${x}</option>`
          )

          .join('');

    }


    // Page load hone par market filter dropdowns fill karte hain.
    populateMarketFilters();


    // Hero section ka FIND YOUR MARKET button market finder open karta hai.
    $('#heroMarketBtn').onclick =
      () => openMarketFinder();


    /*PRODUCT FILTERS
       Product buttons ke through vegetables ko category ke
       according show/hide kiya jata hai.*/


    document
      .querySelectorAll('.product-filter')
      .forEach(button => {

        button.addEventListener(
          'click',
          e => {

            // Product card ke click event ko trigger hone se rokta hai.
            e.stopPropagation();


            // Click kiye gaye filter ki category lete hain.
            const filter =
              button.dataset.filter;


            // Baaki filter buttons se active class remove karte hain.
            document
              .querySelectorAll('.product-filter')
              .forEach(b =>
                b.classList.remove('active')
              );


            // Current selected filter ko active banate hain.
            button.classList.add('active');


            // Har product card ko check karke show ya hide karte hain.
            document
              .querySelectorAll('.product-card')
              .forEach(card => {

                const category =
                  card.dataset.category;


                // "all" ho to sab products show honge.
                // Warna sirf matching category show hogi.
                if(
                  filter === 'all' ||
                  category === filter
                ) {

                  card.style.display =
                    'flex';

                } else {

                  card.style.display =
                    'none';

                }

              });

          }
        );

      });


    /*CHATBOT
       User ke simple questions ko read karke predefined
       FreshFind information ka reply deta hai.*/


    // Chat panel ko open/close karta hai.
    $('#chatToggle').onclick =
      () =>
        $('#chatPanel')
          .classList.toggle('show');


    // Chat input mein Enter press hone par question process hota hai.
    $('#chatInput')
      .addEventListener(
        'keydown',
        e => {

          // Sirf Enter key par chatbot response generate hoga.
          if(e.key !== 'Enter') return;


          // User ke question ko lowercase aur extra spaces ke baghair read karte hain.
          const q =
            e.target.value
              .toLowerCase()
              .trim();


          // Agar koi specific answer match na ho to ye default reply show hoga.
          let r =
            'Try asking about a market, area, vegetable, season, price, harvest or saved picks.';


          // User ke question mein kisi market area ka naam search karte hain.
          const area =
            D.markets.find(
              m =>
                q.includes(
                  m.area.toLowerCase()
                )
            );


          // User ke question mein kisi product ka naam search karte hain.
          const prod =
            D.products.find(
              p =>
                q.includes(
                  p.n.toLowerCase()
                )
            );


          // Checkout/order se related question ho to harvest check karta hai.
          if(
            q.includes('checkout') ||
            q.includes('order')
          ) {

            r =
              getHarvest().length

                ? 'Open HARVEST and choose CHECKOUT to place the frontend demo order.'

                : 'Your harvest is empty. Add a product first.';

          }


          // Harvest ya cart ke baare mein question.
          else if(
            q.includes('harvest') ||
            q.includes('cart')
          ) {

            const count =
              getHarvest()
                .reduce(
                  (a, x) =>
                    a + x.qty,
                  0
                );


            r =
              `Your harvest has ${count} item${count === 1 ? '' : 's'}. Open YOUR HARVEST to review it.`;

          }


          // Saved products/seasons ke baare mein question.
          else if(
            q.includes('save') ||
            q.includes('field notes')
          ) {

            const n =
              getNotes();


            r =
              `FIELD NOTES has ${n.products.length} saved product${n.products.length === 1 ? '' : 's'} and ${n.seasons.length} saved season${n.seasons.length === 1 ? '' : 's'}.`;

          }


          // Agar user kisi product ko kahan find karna hai pooch raha ho.
          else if(
            prod &&
            q.includes('where')
          ) {

            openMarketFinder({
              produce: prod.n
            });


            r =
              `I opened FIND A MARKET for ${prod.n}. Choose an area to narrow the results.`;

          }


          // Product ki price poochne par uski listed price show karta hai.
          else if(
            prod &&
            q.includes('price')
          ) {

            r =
              `${prod.n} is listed at ${prod.price}. Open its product card for details.`;

          }


          // Agar sirf product ka naam/question match ho jaye.
          else if(prod) {

            r =
              `${prod.n}: ${prod.d} Listed at ${prod.price}.`;

          }


          // Agar kisi market area ka naam question mein mil jaye.
          else if(area) {

            const ms =
              D.markets.filter(
                m =>
                  m.area.toLowerCase() ===
                  area.area.toLowerCase()
              );


            // Us area ke markets aur unki timings ka short reply banata hai.
            r =
              ms
                .map(
                  m =>
                    `${m.name}: ${m.days}, ${m.time}.`
                )
                .join(' ');

          }


          // General market/nearby question par market finder open karta hai.
          else if(
            q.includes('market') ||
            q.includes('nearby') ||
            q.includes('near me')
          ) {

            openMarketFinder();


            r =
              'I opened FIND A MARKET. Choose your area and vegetable to see matching markets.';

          }


          // Season related question ka general answer.
          else if(
            q.includes('season')
          ) {

            r =
              'FreshFind has Spring, Summer, Autumn and Winter guides. Click a season card to explore its produce.';

          }


          // Market ke opening days ya timing ke baare mein question.
          else if(
            q.includes('open') ||
            q.includes('timing') ||
            q.includes('day')
          ) {

            r =
              'Market opening days and timings are shown in each market card and detail view.';

          }


          // Final chatbot reply screen par show karte hain.
          $('#chatReply').textContent =
            r;


          // Reply dene ke baad input field clear kar dete hain.
          e.target.value = '';

        }
      );


    /* CONTACT FORM
       Contact form ko frontend demo ke taur par handle karta hai.*/


    $('#contactForm')
      .addEventListener(
        'submit',
        e => {

          // Page reload hone se rokta hai.
          e.preventDefault();


          // User ko successful message show karta hai.
          $('#formMsg').textContent =
            'Message ready — thanks for reaching out to UFF FreshFind!';


          // Form submit hone ke baad fields clear kar deta hai.
          e.target.reset();

        }
      );


    /*SEASON DETAILS + FIELD NOTES
       Season card par click karne se detailed season popup open hota hai.*/


    // Season details ke liye popup dynamically create kar rahe hain.
    const seasonModal =
      document.createElement('div');


    seasonModal.className =
      'season-modal';


    seasonModal.innerHTML = `

      <div class="season-modal-box">

        <!-- Season popup close button -->
        <button
          class="market-close"
          id="seasonClose">

          ×

        </button>


        <!-- Selected season ki image -->
        <div
          class="season-modal-img"
          id="seasonModalImg">
        </div>


        <div class="season-modal-copy">

          <span class="market-kicker">
            SEASONAL GUIDE
          </span>


          <!-- Season ka naam -->
          <h2 id="seasonModalName"></h2>


          <!-- Season ke months -->
          <small id="seasonModalMonths"></small>


          <!-- Season ki description -->
          <p id="seasonModalDesc"></p>


          <h4>
            SEASONAL FRESHFIND PICKS
          </h4>


          <!-- Season ke related products yahan show honge -->
          <div
            id="seasonModalProducts"
            class="season-modal-products">
          </div>


          <div class="season-modal-actions">

            <!-- Products section par jane ke liye -->
            <button id="seasonViewProducts">
              VIEW PRODUCTS
            </button>

            <!-- Season ke products ke liye market finder -->
            <button id="seasonFindMarket">
              FIND A MARKET →
            </button>

            <!-- Season ke tamam selected products harvest mein add -->
            <button id="seasonAddAll">
              ADD SEASONAL PICKS
            </button>

            <!-- Season ko Field Notes mein save -->
            <button id="seasonSave">
              SAVE SEASON ♡
            </button>

          </div>

        </div>

      </div>

    `;


    // Season modal ko page body mein add karte hain.
    document.body.appendChild(
      seasonModal
    );


    // Currently open season ko track karta hai.
    let activeSeasonIndex = 0;


    /*SEASON PRODUCTS
       Har season ke liye relevant FreshFind products define
       kiye gaye hain.*/


    function seasonProducts(s) {

      const map = {

        Spring:[
          'Peas',
          'Spinach',
          'Carrot'
        ],

        Summer:[
          'Cucumber',
          'Capsicum',
          'Lady Finger'
        ],

        Autumn:[
          'Tomato',
          'Carrot',
          'Pumpkin'
        ],

        Winter:[
          'Spinach',
          'Cauliflower',
          'Radish',
          'Beetroot'
        ]

      };


      // Current season ke naam ke matching products return karta hai.
      return D.products.filter(
        p =>
          map[s.name]?.includes(p.n)
      );

    }


    /*OPEN SEASON
       Selected season ki information modal mein fill karta hai.*/


    function openSeason(i) {

      const s =
        D.seasons[i];


      // Selected season ki index save karte hain.
      activeSeasonIndex =
        i;


      // Is season ke related products nikalte hain.
      const ps =
        seasonProducts(s);


      // Season image set karte hain.
      $('#seasonModalImg')
        .style.backgroundImage =
        `url('${s.img}')`;


      // Season name show karte hain.
      $('#seasonModalName')
        .textContent =
        s.name;


      // Season ke months/tag show karte hain.
      $('#seasonModalMonths')
        .textContent =
        s.tag;


      // Season description show karte hain.
      $('#seasonModalDesc')
        .textContent =
        s.p;


      // Related products ko tags ki form mein show karte hain.
      $('#seasonModalProducts')
        .innerHTML =
        ps
          .map(
            p => `<span>${p.n}</span>`
          )
          .join('');


      // Season saved hai to button ka text change hota hai.
      $('#seasonSave').textContent =
        getNotes()
          .seasons
          .includes(i)

          ? 'SAVED SEASON ✓'

          : 'SAVE SEASON ♡';


      // Season modal ko visible karte hain.
      seasonModal
        .classList
        .add('show');

    }


    // Season modal close karta hai.
    function closeSeason() {

      seasonModal
        .classList
        .remove('show');

    }


    // Har season card ko click karke uska detail popup open hota hai.
    document
      .querySelectorAll('.season-card')
      .forEach(c => {

        c.onclick =
          () =>
            openSeason(
              Number(c.dataset.season)
            );

      });


    // Season close button.
    $('#seasonClose').onclick =
      closeSeason;


    // Modal ke bahar click karne par season modal close hota hai.
    seasonModal.addEventListener(
      'click',
      e => {

        if(e.target === seasonModal) {

          closeSeason();

        }

      }
    );


    // Season ko Field Notes mein save/unsave karta hai.
    $('#seasonSave').onclick = () => {

      const n =
        getNotes();


      // Check karte hain ke current season already saved hai ya nahi.
      const at =
        n.seasons.indexOf(
          activeSeasonIndex
        );


      if(at > -1) {

        // Already saved ho to remove kar dete hain.
        n.seasons.splice(at, 1);

      } else {

        // Saved nahi ho to season add kar dete hain.
        n.seasons.push(
          activeSeasonIndex
        );

      }


      // Updated notes localStorage mein save karte hain.
      setNotes(n);


      // Button ka text updated saved status ke according change hota hai.
      $('#seasonSave').textContent =
        n.seasons.includes(
          activeSeasonIndex
        )

          ? 'SAVED SEASON ✓'

          : 'SAVE SEASON ♡';


      // Field Notes ko bhi refresh karte hain.
      renderNotes();

    };


    // Current season ke tamam related products harvest mein add karta hai.
    $('#seasonAddAll').onclick = () => {

      seasonProducts(
        D.seasons[activeSeasonIndex]
      ).forEach(p => {

        addToHarvest(
          D.products.indexOf(p),
          1
        );

      });


      // Season modal close kar dete hain.
      closeSeason();


      // Products add hone ke baad harvest drawer open karte hain.
      $('#harvestDrawer')
        .classList
        .add('show');


      $('#drawerBackdrop')
        .classList
        .add('show');

    };


    // Season se related market finder open karta hai.
    $('#seasonFindMarket').onclick = () => {

      const p =
        seasonProducts(
          D.seasons[activeSeasonIndex]
        )[0];


      closeSeason();


      openMarketFinder(
        p
          ? {produce:p.n}
          : {}
      );

    };


    // User ko products section par smoothly le jata hai.
    $('#seasonViewProducts').onclick = () => {

      closeSeason();


      scrollTo({
        top:
          RANGE[7][0] *
          innerHeight,

        behavior:'smooth'

      });

    };


    /*FIELD NOTES RENDERING
       Saved products aur seasons ko Field Notes popup mein
       dynamically display karta hai.*/


    function renderNotes() {

      // Saved notes localStorage se lete hain.
      const n =
        getNotes();


      const box =
        $('#notesItems');


      // Agar notes container page par nahi hai to function stop.
      if(!box) return;


      // Saved products ke buttons create karte hain.
      const products =
        n.products
          .map(i => {

            const p =
              D.products[i];


            return `

              <button
                class="note-item"
                data-note-product="${i}">

                <span>
                  ${p.n}
                </span>

                <small>
                  ${p.price}
                </small>

              </button>

            `;

          })
          .join('');


      // Saved seasons ke buttons create karte hain.
      const seasons =
        n.seasons
          .map(i => `

            <button
              class="note-item"
              data-note-season="${i}">

              <span>
                ${D.seasons[i].name}
              </span>

              <small>
                ${D.seasons[i].tag}
              </small>

            </button>

          `)
          .join('');


      // Products aur seasons dono ko Field Notes mein show karte hain.
      // Agar kuch saved nahi hai to empty message show hota hai.
      box.innerHTML =
        products +
        seasons ||

        '<div class="market-empty">Nothing saved yet. Use KEEP FOR LATER or SAVE SEASON.</div>';


      // Saved product buttons ko click events dete hain.
      box
        .querySelectorAll(
          '[data-note-product]'
        )
        .forEach(b => {

          b.onclick = () => {

            // Selected saved product ka modal open.
            openProduct(
              Number(
                b.dataset.noteProduct
              )
            );


            // Product open hone ke baad notes popup close.
            $('#notesOverlay')
              .classList
              .remove('show');

          };

        });


      // Saved season buttons ko click events dete hain.
      box
        .querySelectorAll(
          '[data-note-season]'
        )
        .forEach(b => {

          b.onclick = () => {

            // Selected saved season ka detail modal open.
            openSeason(
              Number(
                b.dataset.noteSeason
              )
            );


            // Season open hone ke baad notes popup close.
            $('#notesOverlay')
              .classList
              .remove('show');

          };

        });

    }


    // Field Notes button click hone par saved items show karta hai.
    $('#fieldNotes').onclick = () => {

      $('#notesOverlay')
        .classList
        .add('show');

      renderNotes();

    };


    // Field Notes close button.
    $('#notesClose').onclick =
      () =>
        $('#notesOverlay')
          .classList
          .remove('show');


    // Notes popup ke bahar click karne par popup close hota hai.
    $('#notesOverlay')
      .addEventListener(
        'click',
        e => {

          if(
            e.target.id ===
            'notesOverlay'
          ) {

            $('#notesOverlay')
              .classList
              .remove('show');

          }

        }
      );


    // Page load par Field Notes ko initially render karte hain.
    renderNotes();


    /*CHECKOUT
       Harvest ke selected products ka final order summary
       checkout screen mein show karta hai.*/


    function renderCheckout() {

      // Current harvest list lete hain.
      const h =
        getHarvest();


      // Agar harvest mein items hain to unka summary create hota hai.
      // Warna empty message show hota hai.
      $('#checkoutSummary').innerHTML =
        h.length

          ? h
              .map(x => {

                const p =
                  D.products[x.product];


                return `

                  <div>

                    <span>
                      ${p.n} × ${x.qty}
                    </span>

                    <b>
                      ${priceText(
                        productUnitPrice(p) *
                        x.qty
                      )}
                    </b>

                  </div>

                `;

              })
              .join('')

          : '<div>Your harvest is empty.</div>';

    }


        /*CHECKOUT OPEN
       Checkout button click hone par pehle check karte hain
       ke harvest mein koi product hai ya nahi.*/

    $('#checkoutOpen').onclick = () => { 
 
      // Agar harvest empty hai to checkout open nahi hoga.
      if(!getHarvest().length) return; 
 
 
      // Pehle shopping drawer close kar dete hain.
      closeHarvest(); 
 
 
      // Checkout mein current harvest items show karte hain.
      renderCheckout(); 
 
 
      // Purana checkout message clear kar dete hain.
      $('#checkoutMessage') 
        .textContent = ''; 
 
 
      // Checkout popup ko visible kar dete hain.
      $('#checkoutOverlay') 
        .classList 
        .add('show'); 
 
    }; 
 
 
    // Checkout close button popup ko band karta hai.
    $('#checkoutClose').onclick = 
      () => 
        $('#checkoutOverlay') 
          .classList 
          .remove('show'); 
 
 
    /*CHECKOUT FORM SUBMIT
      Form submit hone par frontend demo order create hota hai.
       Is project mein real payment/order backend connected nahi hai.*/

    $('#checkoutForm').onsubmit = e => { 
 
      // Browser ka default form submit behavior rok dete hain.
      e.preventDefault(); 
 
 
      // Agar harvest empty ho gaya hai to order create nahi hoga.
      if(!getHarvest().length) return; 
 
 
      // Demo order ke liye ek random order ID banate hain.
      const order = 
        'FF-' + 
        Math.random() 
          .toString(36) 
          .slice(2, 8) 
          .toUpperCase(); 
 
 
      // User ko order confirmation message show karte hain.
      $('#checkoutMessage') 
        .textContent = 
        `HARVEST CONFIRMED · DEMO ORDER ${order}`; 
 
 
      // Order confirm hone ke baad harvest empty kar dete hain.
      setHarvest([]); 
 
 
      // Harvest drawer ki UI ko bhi update kar dete hain.
      updateHarvestUI(); 
 
 
      // 2.2 seconds ke baad checkout popup automatically close ho jayega.
      setTimeout( 
        () => 
          $('#checkoutOverlay') 
            .classList 
            .remove('show'), 
        2200 
      ); 
 
    }; 
 
 
    /*HARVEST SOURCE
        User ke harvest mein jo pehla product hai,
       uske basis par market finder open hota hai.*/

    $('#harvestSource').onclick = () => { 
 
      // Current harvest ki list lete hain.
      const h = 
        getHarvest(); 
 
 
      // Agar harvest mein item hai to first product nikalte hain.
      const p = 
        h.length 
          ? D.products[h[0].product] 
          : null; 
 
 
      // Product na mile to aage kuch nahi karna.
      if(!p) return; 
 
 
      // Harvest drawer close kar dete hain.
      closeHarvest(); 
 
 
      // Selected product ke naam ke saath market finder open karte hain.
      openMarketFinder({ 
        produce:p.n 
      }); 
 
    }; 
 
 
    /*ESC KEY
       Escape key press karne par website ke open popups,
       modal aur panels close ho jate hain.*/

    document.addEventListener( 
      'keydown', 
      e => { 
 
        // Sirf Escape key par ye action chalega.
        if(e.key !== 'Escape') return; 
 
 
        // Market finder close karo.
        closeMarketFinder(); 
 
 
        // Market details close karo.
        closeMarketDetails(); 
 
 
        // Product modal ko hide karo.
        modal.classList.remove( 
          'show' 
        ); 
 
 
        // Season modal close karo.
        closeSeason(); 
 
 
        // Harvest drawer close karo.
        closeHarvest(); 
 
 
        // Field Notes popup close karo.
        $('#notesOverlay') 
          .classList 
          .remove('show'); 
 
 
        // Checkout popup close karo.
        $('#checkoutOverlay') 
          .classList 
          .remove('show'); 
 
 
        // Chatbot panel bhi close karo.
        $('#chatPanel') 
          .classList 
          .remove('show'); 
 
      } 
    ); 
 
 
    /*SCROLL SYSTEM
       Page ke tamam sections aur tiles ko collect kar rahe hain.
       RANGE array decide karta hai ke har section page ke
       kis scroll range mein active hoga.*/

    const sc = 
      [ 
        ...document.querySelectorAll( 
          '.sc' 
        ) 
      ]; 
 
 
    // Page ke animated tiles ko ek list mein collect karte hain.
    const tiles = 
      [ 
        ...document.querySelectorAll( 
          '.tile' 
        ) 
      ]; 
 
 
    // Har section ka start aur end scroll position define hai.
    const RANGE = [ 
      [0, 1], 
      [1, 2], 
      [2, 3], 
      [3, 6], 
      [6, 7.5], 
      [7.5, 9], 
      [9, 10.2], 
      [10.2, 11.8], 
      [11.8, 13], 
      [13, 14.2],
      [14.2, 15.5] // <- Fix: Contact section ke liye added range
    ]; 
 
 
    /*THREE.JS PLANT
       Yahan Three.js ka renderer, scene, camera aur lights
       setup ki ja rahi hain taake 3D plant website par render ho.*/

    const R = 
      new THREE.WebGLRenderer({ 
 
        // Three.js isi canvas element par draw karega.
        canvas: $('#gl'), 
 
        // Canvas ko transparent rakhte hain taake background
        // website ke existing design ke saath nazar aaye.
        alpha: true, 
 
        // Edges ko smooth banane ke liye antialiasing on hai.
        antialias: true 
 
      }); 
 
 
    // Device ke hisaab se rendering quality set karte hain.
    R.setPixelRatio( 
      Math.min( 
        devicePixelRatio, 
        2 
      ) 
    ); 
 
 
    // 3D objects ke liye main Three.js scene create karte hain.
    const S = 
      new THREE.Scene(); 
 
 
    // 3D plant ko dekhne ke liye perspective camera create karte hain.
    const C = 
      new THREE.PerspectiveCamera( 
        35, 
        1, 
        .1, 
        50 
      ); 
 
 
    // Camera ko scene se peeche position karte hain.
    C.position.z = 10; 
 
 
    // Soft overall light scene mein add karte hain.
    S.add( 
      new THREE.HemisphereLight( 
        0xfff2e0, 
        0x302015, 
        1.35 
      ) 
    ); 
 
 
    // Main directional light create karte hain.
    const L = 
      new THREE.DirectionalLight( 
        0xffffff, 
        1.7 
      ); 
 
 
    // Directional light ki position set karte hain.
    L.position.set( 
      -4, 
      6, 
      7 
    ); 
 
 
    // Light ko scene mein add karte hain.
    S.add(L); 
 
 
    // Plant par extra warm fill light dene ke liye point light.
    const fill = 
      new THREE.PointLight( 
        0xffc58a, 
        .65, 
        15 
      ); 
 
 
    // Fill light ki position set karte hain.
    fill.position.set( 
      3, 
      3, 
      5 
    ); 
 
 
    // Fill light ko scene mein add karte hain.
    S.add(fill); 
 
 
    // Outer aur inner groups plant ki positioning/animation
    // ko organize karne ke liye use ho rahe hain.
    const outer = 
      new THREE.Group(); 
 
 
    const inner = 
      new THREE.Group(); 
 
 
    // Inner group ko outer group ke andar rakhte hain.
    outer.add(inner); 
 
 
    // Outer group ko main scene mein add karte hain.
    S.add(outer); 
 
 
    /*CREATE PLANT
      Is function mein complete 3D indoor plant create hota hai:
       pot, soil, stem, branches, leaves aur small stones.*/

    function createPlant() { 
 
      // Plant ke tamam parts ko ek group mein collect karte hain.
      const plant = 
        new THREE.Group(); 
 
 
      // Main pot ka material.
      const potMat = 
        new THREE.MeshStandardMaterial({ 
 
          color: 0x8a4f2f, 
 
          roughness: .72, 
 
          metalness: .03 
 
        }); 
 
 
      // Pot ke darker bottom/base ke liye material.
      const potDarkMat = 
        new THREE.MeshStandardMaterial({ 
 
          color: 0x693b27, 
 
          roughness: .8 
 
        }); 
 
 
      // Soil ke liye dark brown material.
      const soilMat = 
        new THREE.MeshStandardMaterial({ 
 
          color: 0x3a2418, 
 
          roughness: 1 
 
        }); 
 
 
      // Plant ke stem aur branches ka material.
      const stemMat = 
        new THREE.MeshStandardMaterial({ 
 
          color: 0x49622f, 
 
          roughness: .9 
 
        }); 
 
 
      // Leaves ke liye multiple green shades rakhe gaye hain
      // taake plant zyada natural aur realistic lage.
      const leafMats = [ 
 
        new THREE.MeshStandardMaterial({ 
          color: 0x506f35, 
          roughness: .78 
        }), 
 
        new THREE.MeshStandardMaterial({ 
          color: 0x688844, 
          roughness: .75 
        }), 
 
        new THREE.MeshStandardMaterial({ 
          color: 0x7d9b50, 
          roughness: .72 
        }), 
 
        new THREE.MeshStandardMaterial({ 
          color: 0x405b2c, 
          roughness: .82 
        }) 
 
      ]; 
 
 
      // Leaves ke veins ko halka green shade diya gaya hai.
      const veinMat = 
        new THREE.MeshStandardMaterial({ 
 
          color: 0x9aaa67, 
 
          roughness: .75 
 
        }); 
 
 
      // Main flower pot ko cylinder shape se create karte hain.
      const pot = 
        new THREE.Mesh( 
          new THREE.CylinderGeometry( 
            .95, 
            .72, 
            1.05, 
            48 
          ), 
          potMat 
        ); 
 
 
      // Pot ko vertical position dete hain.
      pot.position.y = .52; 
 
 
      // Pot ko plant group mein add karte hain.
      plant.add(pot); 
 
 
      // Pot ke neeche darker base create karte hain.
      const base = 
        new THREE.Mesh( 
          new THREE.CylinderGeometry( 
            .74, 
            .70, 
            .12, 
            48 
          ), 
          potDarkMat 
        ); 
 
 
      base.position.y = .035; 
 
      plant.add(base); 
 
 
      // Pot ka outer rim create karte hain.
      const rim = 
        new THREE.Mesh( 
          new THREE.TorusGeometry( 
            .91, 
            .10, 
            14, 
            64 
          ), 
          potMat 
        ); 
 
 
      // Torus ko horizontal position mein rotate karte hain.
      rim.rotation.x = 
        Math.PI / 2; 
 
      rim.position.y = 
        1.04; 
 
      plant.add(rim); 
 
 
      // Inner rim ko thoda darker material dete hain.
      const innerRim = 
        new THREE.Mesh( 
          new THREE.TorusGeometry( 
            .77, 
            .035, 
            10, 
            48 
          ), 
          potDarkMat 
        ); 
 
 
      innerRim.rotation.x = 
        Math.PI / 2; 
 
      innerRim.position.y = 
        1.08; 
 
      plant.add(innerRim); 
 
 
      // Pot ke andar soil ka circular surface banate hain.
      const soil = 
        new THREE.Mesh( 
          new THREE.CylinderGeometry( 
            .78, 
            .78, 
            .08, 
            48 
          ), 
          soilMat 
        ); 
 
 
      soil.position.y = 
        1.08; 
 
      plant.add(soil); 
 
 
      /* Chotay natural stones */
      // Soil par randomly chotay stones add kar rahe hain
      // taake pot zyada natural/detail wala lage.
      for(let i = 0; i < 14; i++) { 
 
        // Stone ke liye random circular angle.
        const angle = 
          Math.random() * 
          Math.PI * 
          2; 
 
 
        // Stone ko center se random distance par place karte hain.
        const radius = 
          .18 + 
          Math.random() * 
          .48; 
 
 
        // Chota spherical stone create karte hain.
        const stone = 
          new THREE.Mesh( 
 
            new THREE.SphereGeometry( 
              .025 + 
              Math.random() * 
              .018, 
              8, 
              8 
            ), 
 
            new THREE.MeshStandardMaterial({ 
 
              // Har second stone ke liye shade alternate hota hai.
              color: 
                i % 2 
                  ? 0x4b3020 
                  : 0x65432d, 
 
              roughness: 1 
 
            }) 
 
          ); 
 
 
        // Stone ko soil ke upar circular position mein rakhte hain.
        stone.position.set( 
 
          Math.cos(angle) * 
          radius, 
 
          1.14, 
 
          Math.sin(angle) * 
          radius 
 
        ); 
 
 
        // Stone ko thoda flat/natural shape dete hain.
        stone.scale.y = 
          .35; 
 
 
        plant.add(stone); 
 
      } 
 
 
      // Plant ka main vertical stem create karte hain.
      const stem = 
        new THREE.Mesh( 
          new THREE.CylinderGeometry( 
            .07, 
            .105, 
            3.15, 
            14 
          ), 
          stemMat 
        ); 
 
 
      stem.position.y = 
        2.62; 
 
      plant.add(stem); 
 
 
      /* BRANCH HELPER
        Ye function points ki help se curved branch create karta hai*/

      function addBranch( 
        points, 
        radius = .045 
      ) { 
 
        // Given points ko Three.js Vector3 coordinates mein convert
        // karke smooth curved path banate hain.
        const curve = 
          new THREE.CatmullRomCurve3( 
            points.map( 
              p => 
                new THREE.Vector3( 
                  p[0], 
                  p[1], 
                  p[2] 
                ) 
            ) 
          ); 
 
 
        // Curve ke along tube bana kar branch create hoti hai.
        const branch = 
          new THREE.Mesh( 
            new THREE.TubeGeometry( 
              curve, 
              14, 
              radius, 
              8, 
              false 
            ), 
            stemMat 
          ); 
 
 
        // Branch ko plant ke group mein add karte hain.
        plant.add(branch); 
 
 
        // Function created branch ko return karta hai.
        return branch; 
 
      } 
 
 
      // Right side ki lower branch.
      addBranch([ 
        [0, 2.0, 0], 
        [.35, 2.35, .02], 
        [.82, 2.62, .03], 
        [1.05, 2.72, 0] 
      ], .045); 
 
 
      // Left side ki branch.
      addBranch([ 
        [0, 2.35, 0], 
        [-.38, 2.62, .05], 
        [-.78, 2.88, .02], 
        [-1.02, 3.0, 0] 
      ], .048); 
 
 
      // Right upper branch.
      addBranch([ 
        [0, 2.72, 0], 
        [.35, 3.02, -.02], 
        [.72, 3.28, -.01], 
        [.92, 3.38, 0] 
      ], .042); 
 
 
      // Left upper branch.
      addBranch([ 
        [0, 3.02, 0], 
        [-.32, 3.27, .04], 
        [-.62, 3.58, .02], 
        [-.76, 3.76, 0] 
      ], .04); 
 
 
      // Top section ki branch.
      addBranch([ 
        [0, 3.35, 0], 
        [.28, 3.58, -.02], 
        [.50, 3.88, 0], 
        [.58, 4.08, 0] 
      ], .035); 
 
 
      /*LEAF HELPER
         Ye function ek leaf aur uski center vein create karta hai.
         Isko different positions, rotations aur sizes ke saath
         baar baar use kiya gaya hai.*/

      function addLeaf( 
        x, 
        y, 
        z, 
        rotX, 
        rotY, 
        rotZ, 
        scale, 
        material 
      ) { 
 
        // Leaf aur vein ko ek group mein rakhte hain.
        const leafGroup = 
          new THREE.Group(); 
 
 
        // Sphere ko scale karke leaf jaisi flat shape banate hain.
        const leaf = 
          new THREE.Mesh( 
            new THREE.SphereGeometry( 
              .52, 
              20, 
              14 
            ), 
            material 
          ); 
 
 
        // Sphere ko stretch karke leaf ki shape dete hain.
        leaf.scale.set( 
          1.12 * scale, 
          .24 * scale, 
          .52 * scale 
        ); 
 
 
        // Leaf ko thoda natural angle dete hain.
        leaf.rotation.z = 
          -.18; 
 
 
        // Leaf ko group mein add karte hain.
        leafGroup.add(leaf); 
 
 
        // Leaf ke beech mein vein create karte hain.
        const vein = 
          new THREE.Mesh( 
            new THREE.CylinderGeometry( 
              .012 * scale, 
              .018 * scale, 
              .82 * scale, 
              6 
            ), 
            veinMat 
          ); 
 
 
        // Vein ko horizontal direction mein rotate karte hain.
        vein.rotation.z = 
          Math.PI / 2; 
 
 
        // Vein ki exact position leaf ke andar adjust karte hain.
        vein.position.x = 
          .02 * scale; 
 
        vein.position.y = 
          .01 * scale; 
 
        vein.position.z = 
          .16 * scale; 
 
 
        // Vein ko leaf group mein add karte hain.
        leafGroup.add(vein); 
 
 
        // Leaf group ki 3D position set karte hain.
        leafGroup.position.set( 
          x, 
          y, 
          z 
        ); 
 
 
        // Leaf ki rotation set karte hain.
        leafGroup.rotation.set( 
          rotX, 
          rotY, 
          rotZ 
        ); 
 
 
        // Leaf ka overall size set karte hain.
        leafGroup.scale.setScalar( 
          scale 
        ); 
 
 
        // Complete leaf group ko plant mein add karte hain.
        plant.add(leafGroup); 
 
 
        // Created leaf group return karte hain.
        return leafGroup; 
 
      } 
 
 
      // Neeche right side ka leaf.
      addLeaf( 
        .98, 
        2.48, 
        .02, 
        -.25, 
        -.2, 
        -.18, 
        1.0, 
        leafMats[1] 
      ); 
 
 
      // Neeche left side ka leaf.
      addLeaf( 
        -.92, 
        2.82, 
        .02, 
        .22, 
        .28, 
        .22, 
        1.0, 
        leafMats[0] 
      ); 
 
 
      // Right middle leaf.
      addLeaf( 
        1.05, 
        2.98, 
        -.02, 
        -.18, 
        .35, 
        -.12, 
        .88, 
        leafMats[2] 
      ); 
 
 
      // Left middle leaf.
      addLeaf( 
        -.92, 
        3.18, 
        .03, 
        .18, 
        -.3, 
        .15, 
        .9, 
        leafMats[3] 
      ); 
 
 
      // Right upper-middle leaf.
      addLeaf( 
        .82, 
        3.46, 
        -.05, 
        -.28, 
        .2, 
        -.12, 
        .92, 
        leafMats[1] 
      ); 
 
 
      // Left upper leaf.
      addLeaf( 
        -.68, 
        3.72, 
        .03, 
        .22, 
        -.25, 
        .2, 
        .82, 
        leafMats[0] 
      ); 
 
 
      // Top-right leaf.
      addLeaf( 
        .58, 
        3.95, 
        -.02, 
        -.3, 
        .3, 
        -.1, 
        .76, 
        leafMats[2] 
      ); 
 
 
      // Top-left leaf.
      addLeaf( 
        -.28, 
        4.18, 
        .02, 
        .12, 
        -.18, 
        .18, 
        .68, 
        leafMats[3] 
      ); 
 
 
      // Front-right side ka extra leaf.
      addLeaf( 
        1.15, 
        2.68, 
        -.55, 
        -.05, 
        -.55, 
        -.35, 
        .72, 
        leafMats[2] 
      ); 
 
 
      // Front-left side ka extra leaf.
      addLeaf( 
        -1.0, 
        2.98, 
        -.5, 
        .08, 
        .45, 
        .35, 
        .76, 
        leafMats[1] 
      ); 
 
 
      // Front upper-right side ka leaf.
      addLeaf( 
        .88, 
        3.42, 
        -.48, 
        -.12, 
        -.45, 
        -.22, 
        .7, 
        leafMats[0] 
      ); 
 
 
      // Plant ke bilkul top ke liye stem.
      const topStem = 
        new THREE.Mesh( 
          new THREE.CylinderGeometry( 
            .035, 
            .05, 
            .9, 
            10 
          ), 
          stemMat 
        ); 
 
 
      // Top stem ki position set karte hain.
      topStem.position.set( 
        0, 
        4.32, 
        0 
      ); 
 
 
      // Top stem ko halka sa tilt dete hain.
      topStem.rotation.z = 
        -.08; 
 
 
      // Top stem ko plant mein add karte hain.
      plant.add(topStem); 
 
 
      // Plant ke very top par final small leaf.
      addLeaf( 
        -.08, 
        4.78, 
        0, 
        -.25, 
        .15, 
        -.08, 
        .58, 
        leafMats[1] 
      ); 
 
 
      // Complete 3D plant group return karte hain.
      return plant; 
    } 
 
 
    // Plant ko createPlant function se generate karte hain.
    const plant = 
      createPlant(); 
 
 
    // Complete plant ka overall size set karte hain.
    plant.scale.setScalar( 
      .72 
    ); 
 
 
    // Plant ko inner animation group mein add karte hain.
    inner.add(plant); 
 
 
    // Plant ki initial position center mein rakhi gayi hai.
    plant.position.set( 
      0, 
      0, 
      0 
    ); 
 
 
    /*PLANT ROTATION
       K array plant ke different scroll points par uski
       position, rotation aur scale ko control karta hai.*/

    const PLANT_TILT = 
      .035; 
 
 
    // Scroll progress ke different stages ke liye keyframes.
    const K = [ 
 
      [0, 0, 0, 1.05, 1.5, 0, 0], 
 
      [1, 0, 0, 1.25, .55, .5, .25], 
 
      [2, .05, -1.5, .55, 1.3, 0, 0], 
 
      [2.8, 0, -9, .02, 1.3, 0, 0], 
 
      [6.2, 0, -9, .02, 1.3, 0, 0], 
 
      [7, 2.5, -.2, .85, .8, 1, .2], 
 
      [9, 2.6, .1, .75, 1.1, 2, -.2], 
 
      [9.7, 3, -9, .02, 1.1, 2, 0] 
 
    ]; 
 
 
    /* Keyframes ke beech smooth values calculate karta hai. */
    function key(p) { 
 
      // Start mein first keyframe ko reference lete hain.
      let i = 0; 
 
 
      // Current scroll position ke according correct keyframe range
      // find karte hain.
      while( 
        i < K.length - 2 && 
        p > K[i + 1][0] 
      ) { 
 
        i++; 
 
      } 
 
 
      // Current range ka starting keyframe.
      const a = 
        K[i]; 
 
 
      // Current range ka ending keyframe.
      const b = 
        K[i + 1]; 
 
 
      // Dono keyframes ke beech smooth progress calculate karte hain.
      const t = 
        smooth( 
          clamp( 
            (p - a[0]) / 
            (b[0] - a[0]), 
            0, 
            1 
          ) 
        ); 
 
 
      // Har value ko starting aur ending keyframe ke beech
      // smoothly interpolate karte hain.
      return a.map( 
        (v, j) => 
          lerp( 
            v, 
            b[j], 
            t 
          ) 
      ); 
 
    } 
 
 
    /*THREE.JS CANVAS SIZE
       Browser window resize hone par renderer aur camera ko
       new screen size ke according update karta hai.*/

    function size() { 
 
      // Current browser width aur height lete hain.
      const w = 
        innerWidth; 
 
      const h = 
        innerHeight; 
 
 
      // Three.js renderer ko current window size dete hain.
      R.setSize( 
        w, 
        h 
      ); 
 
 
      // Camera ka aspect ratio update karte hain.
      C.aspect = 
        w / h; 
 
 
      // Camera ki projection ko new size ke according refresh karte hain.
      C.updateProjectionMatrix(); 
 
    } 
 
 
    // Window resize hone par size function dobara run hota hai.
    addEventListener( 
      'resize', 
      size 
    ); 
 
 
    // Page load par initial size set karte hain.
    size(); 
 
 
    // Current smooth scroll position.
    let pos = 0; 
 
 
    // Scroll ki target position.
    let target = 0; 
 
 
    // Mouse ki horizontal position ko store karta hai.
    let mx = 0; 
 
 
    // Mouse ki vertical position ko store karta hai.
    let my = 0; 
 
 
    // Current page scroll ko normalized value mein convert karta hai.
    const sync = 
      () => 
        target = 
          scrollY / 
          innerHeight; 
 
 
    // Scroll hone par target position update hoti rahegi.
    addEventListener( 
      'scroll', 
      sync 
    ); 
 
 
    // Page load par current scroll position sync karte hain.
    sync(); 
 
 
    // Starting animation position target ke equal rakhte hain.
    pos = 
      target; 
 
 
    /* Mouse movement ko track karte hain.
       mx aur my baad ki 3D animation mein use ho sakte hain. */
    addEventListener( 
      'mousemove', 
      e => { 
 
        // Mouse ki horizontal position ko -0.5 se 0.5 range mein convert.
        mx = 
          e.clientX / 
          innerWidth - 
          .5; 
 
 
        // Mouse ki vertical position ko -0.5 se 0.5 range mein convert.
        my = 
          e.clientY / 
          innerHeight - 
          .5; 
 
      } 
    ); 
 
 
    /*NAV SCROLL
     Navigation links click hone par user ko related section
       par smoothly scroll karaya jata hai.*/

    document 
      .querySelectorAll('nav a') 
      .forEach(a => { 
 
        // Har navigation link ka click event.
        a.onclick = () => { 
 
          // Agar link ka action "shop" hai to products section open karo.
          if( 
            a.dataset.action === 
            'shop' 
          ) { 
 
            // Products section ki starting position tak smooth scroll.
            scrollTo({ 
 
              top: 
                RANGE[7][0] * 
                innerHeight, 
 
              behavior: 
                'smooth' 
 
            }); 
 
 
            
 
 
            // Shop action complete, isliye function yahin stop.
            return; 
 
          } 
 
          // --- FIX: Contact Us click handler ---
          const navText = a.textContent.trim().toLowerCase();
          if(navText === 'contact us') {
            scrollTo({ 
              top: RANGE[10][0] * innerHeight, 
              behavior: 'smooth' 
            }); 
            return; 
          }

          
          // ------------------------------------
 
          // Navigation link se section number read karte hain.
          const section = 
            Number( 
              a.dataset.s 
            ); 
 
 
          // Selected section tak smooth scrolling.
          scrollTo({ 
 
            top: 
              RANGE[section][0] * 
              innerHeight, 
 
            behavior: 
              'smooth' 
 
          }); 
 
        }; 
 
      }); 
 
 
    /* MAIN ANIMATION LOOP
       Ye function continuously animation update karta hai.
       Scroll position ko smooth karta hai aur har section ki
       visibility/animation progress calculate karna start karta hai.*/

    function tick(t) { 
 
      // Current position ko target scroll position ki taraf
      // smoothly move karte hain.
      pos = 
        lerp( 
          pos, 
          target, 
          .08 
        ); 
 
 
      // Har section ke liye uski animation/visibility calculate karte hain.
      sc.forEach( 
        (s, i) => { 
 
          // Current section ki starting aur ending range.
          const [a, b] = 
            RANGE[i]; 
 
 
          // Section ki opacity/visibility progress calculate hoti hai.
          const o = 
            clamp( 
              (pos - a + .25) / 
              .25, 
              0, 
              1 
            ) * 
 
            clamp( 
              (b + .25 - pos) / 
              .25, 
              0, 
              1 
            ); 
                    // Section ki opacity calculated value ke according set hoti hai.
          s.style.opacity = 
            o; 
 
 
          // Agar section almost visible hai to usay visible rakho,
          // warna hidden kar do.
          s.style.visibility = 
            o > .01 
              ? 'visible' 
              : 'hidden'; 
 
        } 
      ); 
 
 
      /*NAVIGATION ACTIVE STATE
         Scroll position ke according navigation link ko active
         class 'on' di jati hai taake user ko current section
         ka idea rahe.*/

      document 
        .querySelectorAll('nav a') 
        .forEach(a => { 
 
          // Navigation link se section number lete hain.
          const index = 
            Number( 
              a.dataset.s 
            ); 
 
 
          // Link ka text lowercase form mein lete hain.
          const navText = 
            a.textContent 
              .trim() 
              .toLowerCase(); 
 
 
          // Current scroll position ke according active class toggle.
          a.classList.toggle( 
 
            'on', 
 
            // "Shop Now" ko normal section active state se exclude karte hain.
            navText !== 'shop now' && 
 
            // Check karte hain ke current position section ke start
            // ke baad aa chuki hai.
            pos >= 
              RANGE[index][0] - .3 && 
 
            // Aur section ke end se pehle hai.
            pos < 
              RANGE[index][1] - .3 
 
          ); 
 
        }); 
 
 
      // Brandmark ko visible rakhte hain.
      $('.brandmark').style.opacity = 
        1; 
 
 
      /*GALLERY / TILE POSITION
         Scroll progress ko tiles ke darmiyan movement ke liye
         use kiya jata hai*/

      // Current scroll position ko tiles ke progress mein convert karte hain.
      const g = 
        clamp( 
          (pos - 3) / 3, 
          0, 
          1 
        ) * 
        (tiles.length - 1); 
 
 
      // Browser ki current width aur height.
      const W = 
        innerWidth; 
 
      const H = 
        innerHeight; 
 
 
      // Screen width ke according tiles ka scale adjust karte hain.
      // Is se different screen sizes par layout better fit hota hai.
      const sw = 
        clamp( 
          W / 1000, 
          .6, 
          1.2 
        ); 
 
 
      // Har tile ko individually position aur size karte hain.
      tiles.forEach( 
        (el, i) => { 
 
          // Current tile aur active gallery position ke beech distance.
          const o = 
            i - g; 
 
 
          // Tile center ke qareeb ho to k ki value zyada hoti hai.
          const k = 
            clamp( 
              1 - Math.abs(o), 
              0, 
              1 
            ); 
 
 
          // Tile ki width calculate karte hain.
          // Center ke qareeb tile thoda bada hota hai.
          const w = 
            (110 + 200 * k) * 
            sw; 
 
 
          // Tile ki height bhi center ke qareeb increase hoti hai.
          const h = 
            (150 + 260 * k) * 
            sw; 
 
 
          // Tile ki horizontal center position calculate hoti hai.
          const cx = 
            W / 2 + 
 
            o * 
            135 * 
            sw + 
 
            Math.sign(o) * 
            Math.min( 
              Math.abs(o), 
              1 
            ) * 
            105 * 
            sw; 
 
 
          // Calculated width, height aur position ko tile ke style
          // mein ek saath apply karte hain.
          Object.assign( 
            el.style, 
            { 
 
              width: 
                w + 'px', 
 
              height: 
                h + 'px', 
 
              left: 
                (cx - w / 2) + 
                'px', 
 
              top: 
                (H / 2 - h / 2) + 
                'px' 
 
            } 
          ); 
 
        } 
      ); 
 
 
      /*3D PLANT SCROLL POSITION
         Scroll ke current point se plant ki position, size aur
         rotation ke liye correct keyframe values lete hain.*/

      // Current scroll position ke liye keyframe values calculate.
      const k = 
        key(pos); 
 
 
      // Camera aspect ratio ke according plant positioning adjust.
      const asp = 
        Math.min( 
          1, 
          C.aspect / 1.6 
        ); 
 
 
      // Plant ki screen position set karte hain.
      outer.position.set( 
        k[1] * asp, 
        k[2], 
        0 
      ); 
 
 
      // Scroll ke according plant ka overall size change hota hai.
      outer.scale.setScalar( 
 
        k[3] * 
        Math.max( 
          .6, 
          asp 
        ) 
 
      ); 
 
 
      // Plant ki rotation mein scroll aur mouse movement dono
      // ka effect apply hota hai.
      outer.rotation.set( 
 
        k[4] + 
        my * 
        PLANT_TILT, 
 
        0, 
 
        k[6] + 
        mx * 
        PLANT_TILT 
 
      ); 
 
 
      // Inner group ko continuously halka rotate karte hain.
      inner.rotation.y = 
        k[5] + 
        t * .0003; 
 
 
      // Current scene aur camera ko canvas par render karte hain.
      R.render( 
        S, 
        C 
      ); 
 
 
      // Next animation frame request karte hain,
      // jis se animation continuously chalti rehti hai.
      requestAnimationFrame( 
        tick 
      ); 
 
    } 
 
 
    // Animation loop ko start karte hain.
    requestAnimationFrame( 
      tick 
    ); 
 
 
    // Page load par harvest/cart UI ko current saved data
    // ke according update karte hain.
    updateHarvestUI(); 
 
 
    /* OADER
       Initial loading screen ke animation aur plant ke saath
       zoom transition ko handle karta hai*/

    // Loader element ko select karte hain.
    const loader = 
      $('#loader'); 
 
 
    // Loader ke animated sweep element ko select karte hain.
    const sweep = 
      document.querySelector( 
        '.loader-sweep' 
      ); 
 
 
    // Agar sweep element page par available hai to uski animation set.
    if(sweep) { 
 
      sweep.style.animation = 
        'loaderSpin 1.8s linear 1'; 
 
    } 
 
 
    // Loader percentage element ko select karte hain.
    const pct = 
      $('#pct'); 
 
 
    // Percentage ko hide kar dete hain.
    if(pct) { 
 
      pct.style.display = 
        'none'; 
 
    } 
 
 
    /*LOADER TO PLANT ZOOM
       Plant ki actual 3D screen position find karke loader ko
       us position ki taraf zoom karwaya jata hai.*/

    function zoomLoaderToPlant() { 
 
      // Loader ya plant available na ho to function stop.
      if( 
        !loader || 
        !plant 
      ) return; 
 
 
      // Camera ki current world matrix update karte hain.
      C.updateMatrixWorld(); 
 
 
      // Plant ke parent group ki world matrix bhi update karte hain.
      outer.updateMatrixWorld( 
        true 
      ); 
 
 
      // Plant ke center ke liye temporary 3D vector.
      const plantCenter = 
        new THREE.Vector3(); 
 
 
      // Plant ki actual world position find karte hain.
      plant.getWorldPosition( 
        plantCenter 
      ); 
 
 
      // 3D position ko camera ke screen coordinates mein convert.
      plantCenter.project(C); 
 
 
      // X coordinate ko browser pixel position mein convert karte hain.
      const x = 
        ( 
          plantCenter.x * 
          .5 + 
          .5 
        ) * 
        innerWidth; 
 
 
      // Y coordinate ko browser pixel position mein convert karte hain.
      const y = 
        ( 
          -plantCenter.y * 
          .5 + 
          .5 
        ) * 
        innerHeight; 
 
 
      // Plant ki calculated X position CSS custom property mein save.
      loader.style.setProperty( 
        '--plant-x', 
        `${x}px` 
      ); 
 
 
      // Plant ki calculated Y position CSS custom property mein save.
      loader.style.setProperty( 
        '--plant-y', 
        `${y}px` 
      ); 
 
 
      // Loader ki zoom animation start karte hain.
      loader.classList.add( 
        'zooming' 
      ); 
 
 
      // 1.2 seconds baad loader ko complete state dete hain.
      setTimeout( 
        () => 
          loader.classList.add( 
            'done' 
          ), 
        1200 
      ); 
 
    } 
 
 
    // Page start hone ke 1.85 seconds baad zoom transition start.
    setTimeout( 
      zoomLoaderToPlant, 
      1850 
    ); 
 
 
    /*BACKGROUND MUSIC
       Website ki background music ko create, control aur
       localStorage mein remember kiya jata hai.*/

    // Music toggle button select karte hain.
    const btn = 
      $('#music'); 
 
 
    // Music button ke text element ko select karte hain.
    const musicText = 
      $('#musicText'); 
 
 
    // JavaScript se audio element create karte hain.
    const audio = 
      document.createElement( 
        'audio' 
      ); 
 
 
    // Audio element ko ID dete hain.
    audio.id = 
      'bgMusic'; 
 
 
    // Background music ki audio file set karte hain.
    audio.src = 
      'images/audio-01.mp3'; 
 
 
    // Music ko repeat mode mein rakhte hain.
    audio.loop = 
      true; 
 
 
    // Browser ko audio pehle se load karne ki permission.
    audio.preload = 
      'auto'; 
 
 
    // Music ki default volume 42% set karte hain.
    audio.volume = 
      .42; 
 
 
    // Audio element ko page body mein add kar dete hain.
    document.body.appendChild( 
      audio 
    ); 
 
 
    // Music initially on rakhte hain.
    let want = true; 
 
 
    /* User ki previous music preference localStorage se read karte hain. */
    try { 
 
      want = 
        localStorage.getItem( 
          'ff-music' 
        ) !== 'off'; 
 
    } catch(e) {} 
 
 
    // Button ka text current music state ke according update karta hai.
    const label = 
      () => 
        musicText.textContent = 
          want 
            ? 'Music On' 
            : 'Music Off'; 
 
 
    // Initial music label show karte hain.
    label(); 
 
 
    /* Music play karne ka helper function. */
    function play() { 
 
      // Music off ho ya tab hidden ho to play nahi karna.
      if( 
        !want || 
        document.hidden 
      ) return; 
 
 
      // Browser agar autoplay allow na kare to error ignore kar dete hain.
      audio 
        .play() 
        .catch( 
          () => {} 
        ); 
 
    } 
 
 
    /*AUDIO UNLOCK
       Browser autoplay restrictions ki wajah se user interaction
       ke baad music start karne ki koshish ki jati hai.*/

    function unlock() { 
 
      // User interaction ke baad music play karne ki try.
      play(); 
 
 
      // Agar audio successfully play ho gayi to temporary
      // interaction listeners remove kar dete hain.
      if(!audio.paused) { 
 
        [ 
          'pointerdown', 
          'keydown', 
          'touchend', 
          'click' 
        ] 
          .forEach( 
            t => 
              removeEventListener( 
                t, 
                unlock 
              ) 
          ); 
 
      } 
 
    } 
 
 
    // Different types ke user interactions par music unlock
    // karne ki koshish hoti rahegi.
    [ 
      'pointerdown', 
      'keydown', 
      'touchend', 
      'click' 
    ] 
      .forEach( 
        t => 
          addEventListener( 
            t, 
            unlock 
          ) 
      ); 
 
 
    /*MUSIC TOGGLE BUTTON
       User button click karke music on/off kar sakta hai.*/

    btn.onclick = e => { 
 
      // Click ko kisi parent click event tak propagate hone se rokna.
      e.stopPropagation(); 
 
 
      // Music ki current state ko reverse karte hain.
      want = 
        !want; 
 
 
      // User ki preference browser mein save karte hain.
      try { 
 
        localStorage.setItem( 
          'ff-music', 
          want 
            ? 'on' 
            : 'off' 
        ); 
 
      } catch(x) {} 
 
 
      // Button ka text new state ke according update.
      label(); 
 
 
      // Agar music on hai to play karo, warna pause karo.
      want 
        ? play() 
        : audio.pause(); 
 
    }; 
 
 
    /*TAB VISIBILITY
       User agar doosri tab par chala jaye to music pause hoti hai.
       Wapas website par aane par music dobara play hoti hai. */

    document.addEventListener( 
      'visibilitychange', 
      () => 
        document.hidden 
          ? audio.pause() 
          : play() 
    ); 
 
 
    // Page load ke 3 seconds baad background music play karne ki try.
    setTimeout( 
      play, 
      3000 
    ); 
 
  }) 
 
  /* DATA LOAD ERROR
     Agar data.json load karte waqt koi error aaye to console
     mein error message show hota hai.*/

  .catch(error => { 
 
    console.error( 
      'FreshFind data load error:', 
      error 
    ); 
 
  });
