const cardData = [
    { title: "Card 1", description: "This is card 1.", price: "$10", image: "https://via.placeholder.com/150" },
    { title: "Card 2", description: "This is card 2.", price: "$20", image: "https://via.placeholder.com/150" },
    { title: "Card 3", description: "This is card 3.", price: "$30", image: "https://via.placeholder.com/150" },
    { title: "Card 4", description: "This is card 4.", price: "$40", image: "https://via.placeholder.com/150" },
    { title: "Card 5", description: "This is card 5.", price: "$50", image: "https://via.placeholder.com/150" },
    { title: "Card 6", description: "This is card 6.", price: "$60", image: "https://via.placeholder.com/150" },
    { title: "Card 7", description: "This is card 7.", price: "$70", image: "https://via.placeholder.com/150" },
    { title: "Card 8", description: "This is card 8.", price: "$80", image: "https://via.placeholder.com/150" },
    { title: "Card 9", description: "This is card 9.", price: "$90", image: "https://via.placeholder.com/150" },
    { title: "Card 10", description: "This is card 10.", price: "$100", image: "https://via.placeholder.com/150" }
];


$(document).ready(function() {
    $('#ShopDetails').on('click', '.btn-company-name', function () {           
        var shopId = $(this).data('shopid');
        $('.card-body-shopcode-'+shopId).toggleClass('d-none');
    });

    $('#ShopDetails').on('click', '.btn-location-map', function () {    
        
        var location = $(this).data('location');
       // const location = "FORUM CENTER, FORUM MALL, Pattambi Rd, Edappal, Kerala 679576";
        const googleMapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(location)}`;
        window.location.href = googleMapsUrl;
    });

    $(document).on('click', '.link-shop-type-filter', function () {    
        var shopTypeId = $(this).data('shoptypeid');
        if(shopTypeId!=0)
        { 
            $(".cls-shop-details").hide();
            $('div[data-shoptypeid="'+shopTypeId+'"]').show();
        }
        else{
            $(".cls-shop-details").show()
        }    
       
    });

    $(document).on('click', '.btn-shop-offer', function () {    
        var shopId = $(this).data('shopid');
        bindShopOffers(shopId);
    });

    
    //data loading details
    $.ajax({
        url: '../ShopSmartly/assets/ShopSmartly.json', // Path to your JSON file
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            
            // Loop through the data and create HTML
            data.Shop.forEach(item => {
                
                var shopId=item.shopId;
                var shopTypeId=item.shopTypeId;
                var icon=item.icon;
                var name=item.name;
                var location=item.location;

                debugger;
                var shopDetails=data.ShopDetails.filter(details => details.shopId === shopId)
                var description=shopDetails[0]?.description;
                var address=shopDetails[0]?.address;
                var phone=shopDetails[0]?.phone;
                var email=shopDetails[0]?.email;

              const shopHTML = `<div class="col-6 col-lg-3 col-md-4 col-12 my-2 mt-sm-1 cls-shop-details" data-shoptypeid="${shopTypeId}">
                <div class="card  border rounded  bg-grey p-1 custom-shadow" >
                    <div class="p-1 rounded bg-white">
                       <img src="../ShopSmartly/images/shops/${icon}" class="card-img-top" alt="${item.name}">                    
                    </div>
                     <ul class="list-group list-group-flush bg-grey">
                      <li class="list-group-item card-title d-flex p-0 m-0 bg-grey">
                        <div class="me-auto">      
                                            
                            <button type="button" data-shopid="${shopId}" class="btn btn-link btn-company-name text-decoration-none">
                                                       ${name}
                            </button>
                        </div> 
                        <div class="py-1 px-1">
                            <button type="button" data-location="${location}" data-shopid="${shopId}" class="btn btn-light btn-sm btn-outline-danger float-right btn-location-map">
                                <i class="bi bi-geo-alt"></i>
                            </button>
                            <button type="button" data-shopid="${shopId}" class="btn btn-light btn-sm btn-outline-danger float-right btn-shop-offer" data-bs-toggle="modal" data-bs-target="#OfferModal">
                                <i class="bi bi-gift"></i>
                            </button>                               
                        </div>
                      </li>                                      
                    </ul>
                    <div class="card-body d-none card-body-shopcode-${shopId} bg-grey">                     
                        <p class="card-text">${description}</p>
                        <div class="contact-info">
                          <h5 class="mb-1">Contact Us</h2>
                          <p class="m-0 d-inline"><strong>Address:</strong></p>
                          <p class="m-0 d-inline"> ${address}
                          </p>      
                          <br>            
                          <p class="d-inline"><strong>Phone:</strong></p>
                          <p class="d-inline">
                              <a href="${phone}">${phone}</a>
                          </p>
                          <br>
                          <p class="d-inline"><strong>Email:</strong></p>
                          <p class="d-inline">
                              <a href="${email}">${email}</a>
                          </p>
                      </div>
                    </div>                    
                  </div>
              </div>`
              $('#ShopDetails').append(shopHTML); // Append the card to the body
            });
        },
        error: function (xhr, status, error) {
            console.error('Error fetching data:', error);
        }
    });

    //data loadin shop offers
    function bindShopOffers(shopId)
    {
        try {
            
            $.ajax({
                url: '../ShopSmartly/assets/ShopSmartly.json', // Path to your JSON file
                method: 'GET',
                dataType: 'json',
                success: function (data) {
                    
                    var shop=data.Shop.filter(details => details.shopId === shopId)                   
                    var name=shop[0]?.name;         
                    $("#OfferModalShopText").text(name);       

                    var shopOffers=data.ShopOffers.filter(details => details.shopId === shopId)                    
                    // Loop through the data and create HTML
                    var className="active";
                    shopOffers.forEach(item => {
                        
                        var imageUrl=item.imageUrl;
                        var fromDate=item.fromDate;
                        var toDate=item.toDate;                     
        
                        const shopOfferHTML =`<img src="../ShopSmartly/images/offers/${imageUrl}" data-fromdate="${fromDate}"  data-todate="${toDate}" class="${className}">`;
                        $('.image-slider').append(shopOfferHTML); // Append the card to the body
                        className="";

                    });
                    const shopOfferHTML =` <button class="prev">Prev</button>
                  <button class="next">Next</button>`;
                    $('.image-slider').append(shopOfferHTML);
                },
                error: function (xhr, status, error) {
                    console.error('Error fetching data:', error);
                }
            });




          } catch (error) {
            // Code to handle the error
          } finally {
            // (Optional) Code that always runs, regardless of an error
          }
    }


});