describe("Buildout Qtify v2", () => {
    beforeEach(() => {
      cy.visit("https://example.com/");
      // cy.visit("https://example.com/");
    });
    describe("Navbar", () => {
    it("Should contain logo, search bar, and a button", () => {
      // Use the custom command to find the navbar container
      cy.findNavbarContainer().as("navbarContainer");

      // Interact with elements within the identified navbar
      cy.get("@navbarContainer").within(() => {
        // Check if the image is visible
        cy.get("img").should("be.visible");

        // Check if the input is visible and type something into it
        cy.get("input").should("be.visible").type("Sample Text");

        // Check if the "Give Feedback" button is visible and click on it
        cy.get("button").contains("Give Feedback").should("be.visible").click();
      });
    });

    it("should check if the logo is vertically centered and has space to its left", () => {
      // Use the custom command to find the navbar container
      cy.findNavbarContainer().as("navbarContainer");

      // Check the logo within the identified navbar
      cy.get("@navbarContainer").within(() => {
        // Check if the logo is vertically centered
        cy.get("img")
          .should("be.visible")
          .and(($img) => {
            const navbarHeight = $img.parent().height();
            const logoHeight = $img.height();
            const topSpace = parseInt($img.css("marginTop"), 10);
            const bottomSpace = parseInt($img.css("marginBottom"), 10);

            expect(navbarHeight / 2).to.be.closeTo(
              logoHeight / 2 + topSpace,
              10
            );

            // Check if the logo has some space to its left using its position
            const logoPosition = $img.position().left;
            expect(logoPosition).to.be.greaterThan(0);
          });
      });
    });

    it("should check the search bar inside Navbar should contain the placeholder keyword 'search' inside it", () => {
      cy.findNavbarContainer().within(() => {
        cy.get("input")
          .should("have.attr", "placeholder")
          .and("match", /search a song|search a album|search an album/i);
      });
    });

    it("should check if the button has a variant of black background", () => {
      cy.findNavbarContainer().within(() => {
        // Grab the button with text "Give Feedback" (case insensitive)
        cy.contains("button", /give feedback/i).as("feedbackButton");
      });

      cy.get("@feedbackButton")
        .invoke("css", "background-color")
        .then((rgb) => {
          const rgba = rgb.match(
            /^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,?[\s+]?([\d.]+)?[\s+]?/i
          );
          const red = parseInt(rgba[1]);
          const green = parseInt(rgba[2]);
          const blue = parseInt(rgba[3]);

          expect(red).to.be.lessThan(50);
          expect(green).to.be.lessThan(50);
          expect(blue).to.be.lessThan(50);
        });
    });

    it("should check if the button's text color is a variant of green", () => {
      cy.findNavbarContainer().within(() => {
        // Grab the button with text "Give Feedback" (case insensitive)
        cy.contains("button", /give feedback/i).as("feedbackButton");
      });

      cy.get("@feedbackButton")
        .invoke("css", "color")
        .then((rgb) => {
          const rgba = rgb.match(
            /^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,?[\s+]?([\d.]+)?[\s+]?/i
          );
          const red = parseInt(rgba[1]);
          const green = parseInt(rgba[2]);
          const blue = parseInt(rgba[3]);

          expect(green).to.be.gt(red);
          expect(green).to.be.gt(blue);
        });
    });

    it("should check if the button has some border-radius", () => {
      cy.findNavbarContainer().within(() => {
        // Grab the button with text "Give Feedback" (case insensitive)
        cy.contains("button", /give feedback/i).as("feedbackButton");
      });

      cy.get("@feedbackButton")
        .invoke("css", "border-radius")
        .should("not.eq", "0px");
    });

    it("should check if hovering on the button changes the cursor to a pointer", () => {
      cy.findNavbarContainer().within(() => {
        // Grab the button with text "Give Feedback" (case insensitive)
        cy.contains("button", /give feedback/i).as("feedbackButton");
      });

      cy.get("@feedbackButton")
        .invoke("css", "cursor")
        .should("eq", "pointer");
    });

    it("should check if the button is styled with 'Poppins' font", () => {
      cy.findNavbarContainer().within(() => {
        // Grab the button with text "Give Feedback" (case insensitive)
        cy.contains("button", /give feedback/i).as("feedbackButton");
      });
        
      cy.get("@feedbackButton")
        .invoke("css", "font-family")
        .should("include", "Poppins");
    });
  });
    describe("Hero Section Tests", () => {
      it('should find the parent element with "100 Thousand Songs, ad-free" text (case-insensitive) and an image', () => {
        // Find element containing the text (case-insensitive)
        cy.contains(/100 Thousand Songs, ad-free/i).then(($textEl) => {
          let currentEl = $textEl;
          while (currentEl.length > 0 && !currentEl.find("img").length) {
            currentEl = currentEl.parent();
          }
  
          if (currentEl.find("img").length) {
            cy.wrap(currentEl).as("parentWithImage");
          } else {
            assert.fail("No parent with the specified text and an image found.");
          }
        });
      });
  
      it("should check the background color of the parent element", () => {
        // Locate the parent element with the specified text (case-insensitive)
        cy.contains(/100 Thousand Songs, ad-free/i)
          .closest(":has(img)")
          .as("targetElement");
  
        // Check the background color of the parent element
        cy.get("@targetElement")
          .invoke("css", "background-color")
          .then((bgColor) => {
            // Assuming a variant of black has RGB values close to 0
            const rgba = bgColor.match(
              /^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,?[\s+]?([\d.]+)?[\s+]?/i
            );
            const red = parseInt(rgba[1]);
            const green = parseInt(rgba[2]);
            const blue = parseInt(rgba[3]);
  
            // Check if the color is a variant of black
            expect(red).to.be.lessThan(50);
            expect(green).to.be.lessThan(50);
            expect(blue).to.be.lessThan(50);
          });
      });
    });

    describe("Cards Tests", () => {
      before(() => cy.stubApiCalls());
  
      it("should match the count of top, and new album cards with their respective API responses", () => {
        // Check top albums
        cy.wait("@getTopAlbums").then((interception) => {
          const topAlbums = interception.response.body;
          let topAlbumElements = [];
  
          topAlbums.forEach((album) => {
            cy.get("body")
              .contains(album.title)
              .should("exist")
              .then(($title) => {
                if ($title.length > 0) {
                  topAlbumElements.push($title);
                }
              });
          });
  
          // After checking all top albums, assert the count
          cy.wrap(topAlbumElements).should("have.length", topAlbums.length);
        });
  
        // Check new albums
        cy.wait("@getNewAlbums").then((interception) => {
          const newAlbums = interception.response.body;
          let newAlbumElements = [];
  
          newAlbums.forEach((album) => {
            cy.get("body")
              .contains(album.title)
              .should("exist")
              .then(($title) => {
                if ($title.length > 0) {
                  newAlbumElements.push($title);
                }
              });
          });
  
          // After checking all new albums, assert the count
          cy.wrap(newAlbumElements).should("have.length", newAlbums.length);
        });
      });
    });

    describe("Albums Section tests", () => {
      before(() => cy.stubApiCalls());
  
      it("should show cards for Top and New Albums and verify the 'Show All' functionality", () => {
        const checkAlbumVisibilityAndToggleShowAll = (alias, label) => {
          // Click "Show All" and expect it to change to "Collapse"
          cy.get("body")
            .contains(/show all/i)
            .click()
            .should("not.contain.text", /show all/i)
            .and("not.contain.text", /show all/i);
  
          // Check the visibility after expanding
          cy.checkVisibilityForCategory(alias, label).then(
            (visibleCountAfter) => {
              cy.log(
                `Number of Visible Cards for ${label} after expanding: ${visibleCountAfter}`
              );
            }
          );
        };
  
        checkAlbumVisibilityAndToggleShowAll("@getTopAlbums", "Top Albums");
        checkAlbumVisibilityAndToggleShowAll("@getNewAlbums", "New Albums");
      });
    });
  
    describe("Slider functionality tests", () => {
      let firstTwoAlbums = []; // Define variable at a higher scope
  
      before(() => {
        cy.stubApiCalls(); // Stubbing API calls before tests
      });
  
      it("should verify if the first two albums are not visible after clicking the slider's next button 4 times", () => {
        // Wait for the relevant API(s) to complete
        cy.wait("@getTopAlbums").then((interception) => {
          const items = interception.response.body;
          firstTwoAlbums = items.slice(0, 2); // Storing the first two albums
        });
  
        cy.wait("@getNewAlbums");
  
        // Identify and click the slider's next button
        cy.get("svg, img, button, .icon").each(($el) => {
          const viewportWidth = Cypress.config("viewportWidth");
  
          const domElement = $el[0];
          const boundingRect = domElement.getBoundingClientRect();
          const isOnRightSide = boundingRect.right > viewportWidth * 0.9;
          const isCircular =
            Math.abs(boundingRect.width - boundingRect.height) < 10;
          const isSmall = boundingRect.height < 100;
  
          if (isOnRightSide && isCircular && isSmall) {
            // Click on the identified element 4 times
            cy.wrap($el).click().click().click().click();
          }
        });
  
        // Check and log what is visible after the clicks
        firstTwoAlbums.forEach((album) => {
          cy.get("body")
            .contains(album.title)
            .should("exist")
            .then(($title) => {
              if ($title.length > 0) {
                let card = $title.parent();
                if (card.is(":visible")) {
                  cy.log(`${album.title} is visible.`);
                }
              }
            });
        });
  
        // Check if the first two albums are not visible in the UI
        firstTwoAlbums.forEach((album) => {
          cy.get("body").contains(album.title).should("not.exist");
        });
      });
    });

    describe("Songs test", () => {
      before(() => cy.stubApiCalls());
      it("should match the count of song cards with their respective API responses", () => {
        // Check songs
        cy.wait("@getSongs").then((interception) => {
          const songs = interception.response.body;
          let songElements = [];
  
          songs.forEach((song) => {
            cy.get("body")
              .contains(song.title)
              .should("exist")
              .then(($title) => {
                if ($title.length > 0) {
                  songElements.push($title);
                }
              });
          });
  
          // After checking all songs, assert the count
          cy.wrap(songElements).should("have.length", songs.length);
        });
      });
    });
  });
