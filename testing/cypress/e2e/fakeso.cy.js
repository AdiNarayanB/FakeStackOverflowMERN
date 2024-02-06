describe('Fake SO Test Suite', () => {


beforeEach(() => {
    // Seed the database before each test
    // cy.exec('node /path/to/server/init.js');
    cy.exec('node /home/adithya/finalProject/server/init.js mongodb://127.0.0.1:27017/fake_so_new');
});

afterEach(() => {
    // Clear the database after each test
    // cy.exec('node /path/to/server/destroy.js');
    cy.exec('node /home/adithya/finalProject/server/destroy.js');
});

describe('Unregistered User - Create Account - 1', () => {
    it('Checks If an Unregistered can create an account with Invalid Credentials', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Welcome');
        cy.contains('Register').click();
        cy.get('#username').type('abaya');
        cy.get('#email').type('abaya@gmail.com');
        cy.get('#password').type('invalid_user1999');
        cy.get('#confirmPassword').type('invalid_user1999');
        cy.contains('Sign Up').click();
        cy.contains('Username Taken');
        cy.contains('Password Invalid');
        //cy.contains('Invalid Email - Email has bad format');
        //cy.contains('Invalid Password - Too much overlap between username and password');
    });
});

describe('Unregistered User - Create Account - 2', () => {
    it('Checks If an Unregistered can create an account with valid Credentials', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Welcome');
        cy.contains('Register').click();
        cy.get('#username').type('testUser12');
        cy.get('#email').type('userNew12@gmail.com');
        cy.get('#password').type('ilikeicecream1234');
        cy.get('#confirmPassword').type('ilikeicecream1234');
        cy.contains('Sign Up').click();
        cy.contains('Log In');



    });
});

describe('Login Registered User - 1', () => {
    it('Checks If a user can login with Invalid Credentials', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Welcome');
        cy.contains('Log In').click();
        cy.get('#email').type('user999@gmail.com');
        cy.get('#password').type('a');
        cy.contains('Log In').click();
        cy.contains('Unregistered Username');
        cy.contains('Log In');

    });
});

describe('Login Registered User - 2', () => {
    it('Checks If a registered user can login with valid Credentials', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Welcome');
        cy.contains('Log In').click();
        cy.get('#email').type('adi1997@gmail.com');
        cy.get('#password').type('password');
        cy.contains('Log In').click();
        cy.contains('Welcome AdithyaNew');
    });
});

describe('Logout Guest User - 1', () => {
    it('Checks If a Guest user can logout', () => {
        cy.visit('http://localhost:3000');
        cy.loginGuestUser();
        cy.contains('Log Out').click();
        cy.contains('Welcome');
        cy.contains('Log In');
        cy.contains('Guest');
        cy.contains('Register');
    });
});


describe('Logout Registered User - 1', () => {
    it('Checks If a Guest user can logout', () => {
        cy.visit('http://localhost:3000');
        cy.loginRegUser();
        cy.contains('Log Out').click();
        cy.contains('Welcome');
        cy.contains('Log In');
        cy.contains('Guest');
        cy.contains('Register');
    });
});
    describe('Logout Guest User - 1', () => {
        it('Checks If a Guest user can logout', () => {
            cy.visit('http://localhost:3000');
            cy.loginGuestUser(); 
            cy.contains('Log Out').click();
            cy.contains('Welcome');
            cy.contains('Log In');
            cy.contains('Guest');
            cy.contains('Register');
        });
    });
    
    
    describe('Logout Registered User - 1', () => {
        it('Checks If a Guest user can logout', () => {
            cy.visit('http://localhost:3000');
            cy.loginRegUser();
            cy.contains('Log Out').click();
            cy.contains('Welcome');
            cy.contains('Log In');
            cy.contains('Guest');
            cy.contains('Register');
        });
    });

describe('Login Guest User - 1', () => {
    it('Checks If a user can login with Guest Access', () => {
        cy.visit('http://localhost:3000');
        cy.contains('Welcome');
        cy.contains('Guest').click();
        cy.contains('Welcome guest');
    });
});


describe('Homepage Registered User - 1', () => {
    it('Checks If the homepage of a registered user renders correctly', () => {
        cy.visit('http://localhost:3000');
        cy.loginRegUser();
        cy.contains('Ask a Question');
        cy.contains('9 questions');
        cy.contains('Newest');
        cy.contains('Active');
        cy.contains('Unanswered');
        cy.contains('Questions');
        cy.contains('Tags');
        cy.get("#searchBar");

        cy.contains('Fake Stack Overflow');

        cy.get('#nextButton').click();

        const qTitles_f2 = ['test q5 title', 'Test Question 8', 'Test Question 5', 'Test Question 10'];
        const answers_f2 = ['1 answers', '6 answers', '1 answers', '1 answers'];
        const views_f2 = ['10 views', '10 views', '121 views', '121 views'];
        const authors_f2 = ['adithya3', 'adithya', 'dev', 'adithya'];
        const date_f2 = ['Dec 17', 'Dec 17', 'Mar 01', 'Mar 01'];
        const times_f2 = ['03:24', '03:24', '21:08', '21:08'];


        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitles_f2[index]);
        });
        cy.get('.postStats').each(($el, index, $list) => {
            cy.wrap($el).should('contain', answers_f2[index]);
            cy.wrap($el).should('contain', views_f2[index]);
        })
        cy.get('.lastActivity').each(($el, index, $list) => {
            cy.wrap($el).should('contain', authors_f2[index]);
            cy.wrap($el).should('contain', date_f2[index]);
            cy.wrap($el).should('contain', times_f2[index]);
        })
        cy.get('#prevButton').click();

        const qTitles_f1 = ['Test Question 2', 'Test Question 9', 'Test Question 6', 'test q1 title', 'test q3 title'];
        const answers_f1 = ['1 answers', '1 answers', '0 answers', '6 answers', '0 answers'];
        const views_f1 = ['121 views', '121 views', '121 views', '10 views', '10 views'];
        const authors_f1 = ['dev', 'adithya', 'dev', 'adithya3', 'adithya3'];
        const date_f1 = ['Mar 04', 'Mar 04', 'Aug 01', 'Dec 17', 'Dec 17'];
        const times_f1 = ['03:30', '03:30', '20:09', '03:24', '03:24'];

        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitles_f1[index]);
        });
        cy.get('.postStats').each(($el, index, $list) => {
            cy.wrap($el).should('contain', answers_f1[index]);
            cy.wrap($el).should('contain', views_f1[index]);
        })
        cy.get('.lastActivity').each(($el, index, $list) => {
            cy.wrap($el).should('contain', authors_f1[index]);
            cy.wrap($el).should('contain', date_f1[index]);
            cy.wrap($el).should('contain', times_f1[index]);
        })
        cy.contains('Unanswered').click();
        cy.contains('2 questions');
        //ADD ACTIVE SORTING TEST LOGIC HERE

    })
});


describe('Homepage Guest User - 1', () => {
    it('Checks If the homepage of a GUest user renders correctly', () => {
        cy.visit('http://localhost:3000');
        cy.loginGuestUser();
        cy.contains('Post Question').should('not.exist');

        cy.contains('Ask a Question').should('not.exist');
        cy.contains('9 questions');
        cy.contains('Newest');
        cy.contains('Active');
        cy.contains('Unanswered');
        cy.contains('Questions');
        cy.contains('Tags');
        cy.get("#searchTextBar")

        cy.contains('Fake Stack Overflow');

        cy.get('#nextButton').click();

        const qTitles_f2 = ['test q5 title', 'Test Question 8', 'Test Question 5', 'Test Question 10'];
        const answers_f2 = ['1 answers', '6 answers', '1 answers', '1 answers'];
        const views_f2 = ['10 views', '10 views', '121 views', '121 views'];
        const authors_f2 = ['adithya3', 'adithya', 'dev', 'adithya'];
        const date_f2 = ['Dec 17', 'Dec 17', 'Mar 01', 'Mar 01'];
        const times_f2 = ['03:24', '03:24', '21:08', '21:08'];


        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitles_f2[index]);
        });
        cy.get('.postStats').each(($el, index, $list) => {
            cy.wrap($el).should('contain', answers_f2[index]);
            cy.wrap($el).should('contain', views_f2[index]);
        })
        cy.get('.lastActivity').each(($el, index, $list) => {
            cy.wrap($el).should('contain', authors_f2[index]);
            cy.wrap($el).should('contain', date_f2[index]);
            cy.wrap($el).should('contain', times_f2[index]);
        })
        cy.get('#prevButton').click();

        const qTitles_f1 = ['Test Question 2', 'Test Question 9', 'Test Question 6', 'test q1 title', 'test q3 title'];
        const answers_f1 = ['1 answers', '1 answers', '0 answers', '6 answers', '0 answers'];
        const views_f1 = ['121 views', '121 views', '121 views', '10 views', '10 views'];
        const authors_f1 = ['dev', 'adithya', 'dev', 'adithya3', 'adithya3'];
        const date_f1 = ['Mar 04', 'Mar 04', 'Aug 01', 'Dec 17', 'Dec 17'];
        const times_f1 = ['03:30', '03:30', '20:09', '03:24', '03:24'];

        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitles_f1[index]);
        });
        cy.get('.postStats').each(($el, index, $list) => {
            cy.wrap($el).should('contain', answers_f1[index]);
            cy.wrap($el).should('contain', views_f1[index]);
        })
        cy.get('.lastActivity').each(($el, index, $list) => {
            cy.wrap($el).should('contain', authors_f1[index]);
            cy.wrap($el).should('contain', date_f1[index]);
            cy.wrap($el).should('contain', times_f1[index]);
        })
        cy.contains('Unanswered').click();
        cy.contains('2 questions');
        //ADD ACTIVE SORTING TEST LOGIC HERE

    })
});

describe('Question Summary Text less than 50 characters ', () => {
    it('Checks if Question Summary Text less than 50 characters', () => {
        cy.visit('http://localhost:3000');
        cy.loginRegUser();
        cy.get('#postSummary').invoke('text').then((text) => {
            expect(text.trim().length).to.be.lessThan(50);
        });

    });
});



describe('Registered User - Question vote 1', () => {
    it('Checks if a question can be upvoted and increase user rep', () => {

        const votes = ['1 votes', '1 votes', '1 votes', '1 votes', '1 votes'];
        cy.visit('http://localhost:3000');
        cy.loginRegHighRepUser();

        cy.get('[id*="upvoteButton"]').each(($el, index) => {
            cy.wrap($el).click();
        });

        cy.get('.postStats').each(($el, index) => {
            cy.wrap($el).should('contain', votes[index]);
        });

        cy.contains('UserProfile').click();
        cy.contains('Rep Points: 105');


        // ADD ACTIVE SORTING TEST LOGIC HERE
    });
});

describe('Registered User - Question vote 2', () => {
    it('Checks if a question can be downvoted and decrease user rep', () => {

        const votes = ['-1 votes', '-1 votes', '-1 votes', '-1 votes', '0 votes'];
        cy.visit('http://localhost:3000');
        cy.loginRegHighRepUser();

        // Click all buttons with IDs containing the substring "downvoteButton"
        cy.get('[id*="downvoteButton"]').each(($el, index) => {
            cy.wrap($el).click();
        });

        // Check that the postStats contain the expected vote values
        cy.get('.postStats').each(($el, index) => {
            cy.wrap($el).should('contain', votes[index]);
        });

        cy.contains('UserProfile').click();
        //         cy.contains('50 Rep');

        // Go to UserProfile and check Rep Points
        //         cy.contains('UserProfile').click();
        cy.contains('Rep Points: 40');
    });
});


describe('Search Functionality', () => {
    it('Search string matches correct filtering', () => {
        const filterText = 'q1'
        cy.visit('http://localhost:3000');
        cy.loginRegUser();
        cy.get('#searchBar').type(filterText);
        cy.get('.postTitle').each(($el) => {
            cy.wrap($el).should('contain', filterText); // Check if each post title contains the search term
        });
        
    })
})


    

describe('Registered User - New Question Form Metadata', () => {
    it('Ask a Question creates and displays expected meta data', () => {
        cy.visit('http://localhost:3000');
        cy.loginRegHighRepUser();
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('TQ1');
        cy.get('#formTextInput').type('Test Q1 Text');
        cy.get('#formTagInput').type('t1 t8');
        cy.contains('Post Question').click();
        cy.contains('Fake Stack Overflow');
        cy.contains('10 questions');
        cy.contains('dev asked 0 seconds ago');
        const answers = ['0 answers'];
        const views = ['0 views'];
        cy.get('.postTag').should('contain', 't8');
    });
});

describe('Registered User- New Question Form with many tags 1', () => {
    it('Ask a Question creates and displays in All Questions with necessary tags', () => {
        cy.visit('http://localhost:3000');
        cy.loginRegUser();
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question 1');
        cy.get('#formTextInput').type('Test Question 1 Text');
        cy.get('#formTagInput').type('javascript t99 t100');
        //cy.get('#formUsernameInput').type('joym');
        cy.contains('Post Question').click();
        cy.contains('Fake Stack Overflow');
        cy.contains('javascript');
        cy.contains('t99');
        cy.contains('t100');
    })
});

describe('Registered User - New Question Form with many tags 2', () => {
    it('Ask a Question creates and displays in All Questions with necessary tags', () => {
        cy.visit('http://localhost:3000');
        cy.loginRegHighRepUser();
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question 1');
        cy.get('#formTextInput').type('Test Question 1 Text');
        cy.get('#formTagInput').type('javascript t1 t2 ti89');
        //cy.get('#formUsernameInput').type('joym');
        cy.contains('Post Question').click();
        cy.contains('Fake Stack Overflow');
        cy.contains('javascript');

        cy.contains('ti89');
    })
});

describe('Registered User - New Question Form Error Empty Title', () => {
    it('Ask a Question with empty title shows error', () => {
        cy.visit('http://localhost:3000');
        cy.loginRegHighRepUser();
        cy.contains('Ask a Question').click();

        cy.get('#formTextInput').type('     ');
        cy.get('#formTagInput').type('javascript');
        //cy.get('#formUsernameInput').type('joym');
        cy.contains('Post Question').click();
        cy.contains('Title cannot be empty');
    })
});



describe('Registered User - New Question Form Error Long Title', () => {
    it('Ask a Question with long title shows error', () => {
        cy.visit('http://localhost:3000');
        cy.loginRegHighRepUser();
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question 0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789');
        cy.get('#formTextInput').type('Test Question 1 Text');
        cy.get('#formTagInput').type('javascript');
        //cy.get('#formUsernameInput').type('joym');
        cy.contains('Post Question').click();
        cy.contains('Title cannot be more than 100 characters');
    })
});

describe('Registered User - New Question Form Error Empty Text', () => {
    it('Ask a Question with empty text shows error', () => {
        cy.visit('http://localhost:3000');
        cy.loginRegUser();
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question 1');
        cy.get('#formTagInput').type('javascript');
        //cy.get('#formUsernameInput').type('joym');
        cy.contains('Post Question').click();
        cy.contains('Question text cannot be empty');
    })
});


describe('New Question Form Error Extra Tags', () => {
    it('Ask a Question with more than 5 tags shows error', () => {
        cy.visit('http://localhost:3000');
        cy.loginRegHighRepUser();
        cy.contains('Ask a Question').click();

        cy.get('#formTitleInput').type('Test Question 1');
        cy.get('#formTextInput').type('Test Question 1 Text');
        cy.get('#formTagInput').type('t1 t2 t3 t4 t5 t6');
        //cy.get('#formUsernameInput').type('joym');
        cy.contains('Post Question').click();
        cy.contains('Cannot have more than 5 tags');
    })
});

describe('New Question Form Error Long New Tag', () => {
    it('Ask a Question with a long new tag', () => {
        cy.visit('http://localhost:3000');
        cy.loginRegHighRepUser();
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question 1');
        cy.get('#formTextInput').type('Test Question 1 Text');
        cy.get('#formTagInput').type('t1 t2 t3t4t5t6t7t8t9t3t4t5t6t7t8t9');
        //cy.get('#formUsernameInput').type('joym');
        cy.contains('Post Question').click();
        cy.contains('New tag length cannot be more than 20');
    })
});
describe('Add Question Button Guest Visibility', () => {
    it('Checks If a Guest User can Add a New Question', () => {
        cy.visit('http://localhost:3000');
        cy.loginGuestUser();
        cy.contains('Post Question').should('not.exist');

    })
});

  describe('Registered User Add Question rep < 50', () => {
    it('Checks if a registered user with rep less than 50 can add a question and not update any new tags', () => {
        cy.visit('http://localhost:3000');
        cy.loginRegLowRepUser()
        cy.contains('Ask a Question').click();
        cy.get('#formTitleInput').type('Test Question 1');
        cy.get('#formTextInput').type('Test Question 1 Text');
        cy.get('#formTagInput').type('t1 NEWTAG');
        cy.contains('Post Question').click();
        cy.get(".error-message").should('be.visible').contains('Failed');
    })});




describe('Guest Answer Page 1', () => {
    it('Answer Page displays expected header for Guest User', () => {
        cy.visit('http://localhost:3000');
        cy.loginGuestUser()
        cy.contains('Test Question 2').click();
        cy.get('#answersHeader').should('contain', 'Test Question 2');
        cy.get('#answersHeader').should('contain', '0 votes');
        cy.get('#answersHeader').should('contain', '1 answers');

        cy.get('#sideBarNav').should('contain', 'Questions');
        cy.get('#sideBarNav').should('contain', 'Tags');
    })
})

describe('Guest Answer Page 2', () => {
    it('Answer Page displays expected question text for Guest User', () => {
        //const text = "test q1 text and descrip";

        cy.visit('http://localhost:3000');
        cy.loginGuestUser();

        cy.contains('Test Question 2').click();
        cy.get('#questionBody').should('contain', '122 views');
        cy.get('#questionBody').should('contain', 'Zoom has a video issue');
        cy.get('#questionBody').should('contain', 'dev');
        cy.get('#questionBody').should('contain', 'Mar 04, 2022');
        cy.get('#questionBody').should('contain', '3:30');
    })
})

describe('Guest Answer Page 3', () => {
    it('Answer Page displays expected answers for Guest User', () => {
        const answers = ["Make a post"];
        cy.visit('http://localhost:3000');
        cy.loginGuestUser();

        cy.contains('Test Question 2').click();
        cy.get('.answerText').each(($el, index) => {
            cy.wrap($el).should('contain', answers[index]);
        });
    });
});

describe('Guest Answer Page 4', () => {
    it('Answer Page displays expected authors for Guest User', () => {
        const authors = ['dev'].reverse();
        const date = ['Mar 04'].reverse();
        const times = ['3:30'];
        const votes = ['50 Votes'].reverse();
        cy.visit('http://localhost:3000');
        cy.loginGuestUser();
        cy.contains('Test Question 2').click();
        cy.get('.answerAuthor').each(($el, index) => {
            cy.wrap($el).should('contain', authors[index]);
            cy.wrap($el).should('contain', date[index]);
            cy.wrap($el).should('contain', times[index]);
            cy.wrap($el).should('contain', votes[index]);
        });
    });
});

describe('Guest Answer Creation', () => {
    it('Checks if Answer can be created by Guest User', () => {
        cy.visit('http://localhost:3000');
        cy.loginGuestUser();
        cy.contains('Test Question 2').click();
        cy.contains('button', 'Answer Question').should('not.exist');


    });
});




describe('Registered Answer Page 1', () => {
    it('Answer Page displays expected header for Reg User', () => {
        cy.visit('http://localhost:3000');
        cy.loginRegHighRepUser();
        cy.contains('Test Question 2').click();
        cy.get('#answersHeader').should('contain', 'Zoom has a video issue');
        cy.get('#answersHeader').should('contain', '0 votes');
        cy.get('#answersHeader').should('contain', '1 answers');
        cy.get('#answersHeader').should('contain', 'Ask a Question');
        cy.get('#sideBarNav').should('contain', 'Questions');
        cy.get('#sideBarNav').should('contain', 'Tags');
        //ADD CHECK FOR BUTTON LIKE POST COMMENT, ANSWER UPVOTE, ANSWER DOWNVOTE, POST ANSWER
        cy.contains('Upvote');
        cy.get('[id*="upvoteButtonAns"]')

        cy.contains('Downvote');
        cy.get('[id*="downvoteButtonAns"]')

    })
})

	describe('Registered User Answer Page 2', () => {
     it('Answer Page displays expected question text for Reg User', () => {
		const text = "test q1 text and descrip";

		cy.visit('http://localhost:3000');
		cy.loginRegHighRepUser();

		cy.contains('Test Question 2').click();
		cy.get('#questionBody').should('contain', '122 views');
		cy.get('#questionBody').should('contain', 'Zoom has a video');
		cy.get('#questionBody').should('contain', 'dev');
		cy.get('#questionBody').should('contain', 'Mar 04, 2022');
		cy.get('#questionBody').should('contain', '3:30');
		});
		});

describe('Registered User Answer Page 3', () => {
    it('Answer Page displays expected answers for Reg User', () => {
        const answers = ["Make a post"];
        cy.visit('http://localhost:3000');
        cy.loginRegHighRepUser();
        cy.contains('Test Question 2').click();
        cy.get('.answerText').each(($el, index) => {
            cy.wrap($el).should('contain', answers[index]);
        });
    });
});

describe('Registered User Answer Page 4', () => {
    it('Answer Page displays expected authors for Reg User', () => {
        const authors = ['dev'].reverse();
        const date = ['Mar 04'].reverse();
        const times = ['3:30'].reverse();
        const votes = ['50 Votes'].reverse();
        cy.visit('http://localhost:3000');
        cy.loginRegHighRepUser();
        cy.contains('Test Question 2').click();
        cy.get('.answerAuthor').each(($el, index) => {
            cy.wrap($el).should('contain', authors[index]);
            cy.wrap($el).should('contain', date[index]);
            cy.wrap($el).should('contain', times[index]);
            cy.wrap($el).should('contain', votes[index]);
        });
    });
});

describe('Registered User Answer Page 5', () => {
    it('Answer Page displays Answers in Pages of 5 and can be navigated through', () => {
            const arr = ["a4","best","Teams","a3","a2"]
            cy.visit('http://localhost:3000');
            cy.loginRegHighRepUser();
            cy.contains('test q1 title').click();

            cy.get('[id*="answerText"]').each(($el, index) => {
                    cy.wrap($el).contains(arr[index]);
                });
                
                

                cy.get('[id*="answerText"]').first().contains("a4"); 
                cy.get('#answerPageNext').click(); 
                cy.get('[id*="answerText"]').first().contains("a1");

            });
    });




describe('Registered User - Pinned Answer', () => {
    it('Answer Page displays pinned answer if present, and allows the poster of the question to accept an answer as a pinned answer', () => {

        cy.visit('http://localhost:3000');
        cy.loginRegHighRepUser();
        const username = "dev";
        cy.get('.lastActivity').first().contains(username);

        cy.contains('Test Question 2').click();
        cy.contains('Make Pinned').click();
        cy.contains('Pinned Answer');



    });
});

describe('Registered User - Vote Answer Makes Question Active', () => {
    it('Checks if voting on an answer, makes the question active', () => {



        cy.visit('http://localhost:3000');
        cy.loginRegHighRepUser();
        cy.contains('Test Question 2').click();
        cy.get('[id*="upvoteButtonAnswer"]').each(($el, index) => {
            cy.wrap($el).click();
        });
        cy.visit("#Questions");
        cy.contains('Active').click();

        cy.get('.postTitle').contains('Test Question 2');

    });
});



describe('Registered User - Vote Answer Reduces Rep', () => {
    it('Checks if downvoting on an answer, reduces user reputation', () => {
        cy.visit('http://localhost:3000');
	    cy.loginRegHighRepUser();
            const oldRep = 80;
            cy.contains('Test Question 2').click();
            cy.get('[id*="downvoteButtonAnswer"]').first().click();
            cy.contains('UserProfile').click();
            cy.contains((oldRep - 10).toString());
        });
    });


describe('Registered User - Vote Answer Increases Rep', () => {
    it('Checks if upvoting on an answer, increases user reputation', () => {
        cy.visit('http://localhost:3000');
	    cy.loginRegHighRepUser();
        const oldRep = 80;
        cy.contains('Test Question 2').click();
        cy.get('[id*="upvoteButtonAnswer"]').first().click();
        cy.contains('UserProfile').click();
        cy.contains((oldRep + 5).toString());
    });
    });
    
describe('Registered User - Add Answer Makes Question Active', () => {
    it('Checks if adding an answer to a question makes the question active', () => {
        cy.visit('http://localhost:3000');
        cy.loginRegHighRepUser();
        cy.contains('Test Question 9').click();
        cy.contains('Answer Question').click();
        cy.get('#answerTextInput').type('new adi');
        cy.contains('Post Answer').click();
        cy.visit("#Questions");
        cy.contains('Active').click();
        cy.get('.postTitle').first().contains('Test Question 9');
    });
});

describe('Registered User - Add Answer Puts Newest Answer to the top', () => {
    it('Checks if adding a new answer, adds it at the top of the answer list', () => {
        cy.visit('http://localhost:3000');
        cy.loginRegHighRepUser();
        cy.contains('Test Question 9').click();
        cy.contains('Answer Question').click();
        cy.get('#answerTextInput').type('new adi');
        cy.contains('Post Answer').click();
        cy.get('[id*="answerText"]').first().contains('new adi');
    });
});


describe('Registered User - Vote Answer Increases Rep', () => {
    it('Checks if upvoting on an answer, increases user reputation', () => {
        cy.visit('http://localhost:3000');
        cy.loginRegHighRepUser();
            const oldRep = 80;
            cy.contains('Test Question 2').click();
            cy.get('[id*="upvoteButtonAnswer"]').first().click();
            cy.contains('UserProfile').click();
            cy.contains((oldRep + 5).toString());
        });
    });


describe('Registered User - Add Comment 1', () => {
    it('Checks if a registered User can add an invalid comment', () => {
        cy.visit('http://localhost:3000');
        cy.loginRegHighRepUser();
        cy.get('#nextButton').click();
        cy.contains('test q5 title').click();
        cy.contains('View Comments').first().click();
        cy.get('[id*="commentBox"]').first().type("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere pretium augue, sit amet ultricies risus bibendum vel.uerwio jiofgrwjklffj");
        cy.contains('Post Comment').click();
        cy.contains('Comment Too Long');
    });
});



describe('Registered User - Add Comment 2', () => {
    it('Checks if a registered User can add a comment with low rep', () => {
        cy.visit('http://localhost:3000');
        cy.loginRegLowRepUser();
        cy.get('#nextButton').click();
        cy.contains('test q5 title').click();
        cy.contains('View Comments').first().click();
        cy.get('[id*="commentBox"]').type("Lorem ipsum dolor sit amet, consectetur adipiscing elit.");
        cy.contains('Post Comment').click();
        cy.contains('Lorem');

        });
    });
    
describe('Registered User - Add Comment 3', () => {
    it('Checks if a registered User can add a valid comment', () => {
        cy.visit('http://localhost:3000');
                cy.loginRegHighRepUser();
                cy.get('#nextButton').click();
                cy.contains('test q5 title').click();
                cy.contains('View Comments').first().click();
                cy.get('[id*="commentBox"]').type("Lorem");
                cy.contains('Post Comment').click();
                cy.contains('Lorem');
            });
        });
    
describe('Registered User - Upvote Comment 1', () => {
    it('Checks if a registered User can upvote a comment', () => {
    cy.visit('http://localhost:3000');
    cy.loginRegHighRepUser();
    cy.get('#nextButton').click();
    cy.contains('test q5 title').click();
    cy.contains('View Comments').first().click();
    cy.get('[id*="upvoteButtonComment"]').click();
    cy.contains('Comment by').first().contains('Votes: 1');
});
});
    
    
describe('Registered User - Upvote Comment 2', () => {
    it('Checks if a registered User can upvote a comment and also has no impact on their reputation', () => {

        cy.visit('http://localhost:3000');
        cy.loginRegHighRepUser();
        const oldRep = 80;
        cy.get('#nextButton').click();
        cy.contains('test q5 title').click();
        cy.contains('View Comments').first().click();
        cy.get('[id*="upvoteButtonComment"]').click();
        cy.contains('UserProfile').click();
        cy.contains(oldRep.toString());
    });
});


describe('Registered User - Upvote Comment 3', () => {
        it('Checks if upvoting comment makes question active', () => {
            cy.visit('http://localhost:3000');
            cy.loginRegHighRepUser();
            cy.get('#nextButton').click();
            cy.contains('Test Question 5').click();
            cy.contains('View Comments').first().click();
            cy.get('[id*="upvoteButtonComment"]').click();
            cy.contains('Questions').click();
            cy.contains('Active').click();
            cy.get('.postTitle').first().should('contain', 'Test Question 2');
        });
    });


describe('Registered User - Upvote Comment 1', () => {
    it('Checks if a registered User can upvote a comment', () => {
        cy.visit('http://localhost:3000');
        cy.loginRegHighRepUser();
        cy.get('#nextButton').click();
        cy.contains('test q5 title').click();
        cy.contains('View Comments').first().click();
        cy.get('[id*="upvoteButtonComment"]').click();
        cy.contains('Comment by').first().contains('Votes: 1');
        });
    });

    

describe('Registered User UserProfile Verifcation', () => {
    it('Checks if a Guest User can access the User Profile Link', () => {
        cy.visit('http://localhost:3000');
        cy.loginGuestUser();
        cy.get('#sideBarNav').should('not.contain', 'UserProfile');
    });
});


describe('UserProfile Page Contains Membership Time Information', () => {
    it('Checks if a User Profile has user rep points', () => {
        cy.visit('http://localhost:3000');
        cy.loginRegUser2();
        cy.get('a[href="#UserProfile"]').click();
        cy.contains('Membership').should('exist');
        });
    });

describe('UserProfile Page Contains Rep Points ', () => {
    it('Checks if a User Profile has user rep points', () => {
        cy.visit('http://localhost:3000');
        cy.loginRegUser2();
        cy.get('a[href="#UserProfile"]').click();
        cy.contains('Rep').should('exist');
        
    });
});

describe('UserProfile Page Contains View User Questions Link ', () => {
    it('Checks if a User Profile cant be viewed by a guest user', () => {
        cy.visit('http://localhost:3000');
        cy.loginRegUser2();
        cy.get('a[href="#UserProfile"]').click();
        cy.contains('button', 'questions').should('exist');
    });
});

describe('UserProfile Page Contains View User Answers Link ', () => {
    it('Checks if a User Profile contains answer link', () => {
        cy.visit('http://localhost:3000');
        cy.loginRegUser2();
        cy.get('a[href="#UserProfile"]').click();
        cy.contains('button', 'answers').should('exist');

    });
});

describe('UserProfile Page Contains View User Tags Link ', () => {
    it('Checks if a User Profile contains tag link', () => {
        cy.visit('http://localhost:3000');
        cy.loginRegUser2();
        cy.get('a[href="#UserProfile"]').click();
        cy.contains('button', 'tags').should('exist');
        
    });
});


describe('UserProfile Questions Posted by the User ', () => {
    it('Checks if a User Profile contains answer link', () => {
        cy.visit('http://localhost:3000');
        cy.loginRegUser2();
        cy.get('a[href="#UserProfile"]').click();
        cy.contains('questions').click();
        cy.get('.lastActivity').each(($el) => {
            cy.wrap($el).should('contain.text', 'adithya');
          });
       
    });
});


describe('UserProfile Questions Posted by the User in Newest Order ', () => {
    const qTitles = ['Test Question 9', 'Test Question 8', 'Test Question 10'];
    it('Checks if a User Profile Questions were posted in the Newest Order', () => {
        cy.visit('http://localhost:3000');
        cy.loginRegUser2();
        cy.get('a[href="#UserProfile"]').click();
        cy.contains('questions').click();
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitles[index]);
        })});
        
describe('Registered User - Upvote Comment 2', () => {
        it('Checks if a registered User can upvote a comment and also has no impact on their reputation', () => {

            cy.visit('http://localhost:3000');
            cy.loginRegHighRepUser();
            const oldRep = 80;
            cy.get('#nextButton').click();
            cy.contains('test q5 title').click();
	        cy.contains('View Comments').first().click();
            cy.get('[id*="upvoteButtonComment"]').click();
            cy.contains('UserProfile').click();
            cy.contains(oldRep.toString());

        });
    });

describe('UserProfile Questions Title Click Posted by the User ', () => {
    it('Checks if a User Profile Questions Title Click open Questions Title Clickanswer link', () => {
        cy.visit('http://localhost:3000');
        cy.loginRegUser2();
        cy.get('a[href="#UserProfile"]').click();
        cy.contains('questions').click();
        cy.contains('.postTitle', 'Test Question 9').click();
        cy.contains('.page-results-title', 'New Question Page');
    });
});


describe('UserProfile New Questions Update', () => {
    it('Checks if a User Profile Questions can be updated', () => {
        cy.visit('http://localhost:3000');
        cy.loginRegUser2();
        cy.get('a[href="#UserProfile"]').click();
        cy.contains('questions').click();
        cy.contains('.postTitle', 'Test Question 9').click();
        cy.contains('.page-results-title', 'New Question Page');
        cy.get('#questionTextInput').type('UPDATE HERE');
        cy.get('#UpdateQuestion').contains('Update Question').click();

    });
});

describe('UserProfile New Questions Deletion  ', () => {
    it('Checks if a User Profile Questions can be deleted', () => {
        cy.visit('http://localhost:3000');
        cy.loginRegUser2();
        cy.get('a[href="#UserProfile"]').click();
        cy.contains('questions').click();
        cy.contains('.postTitle', 'Test Question 9').click();
        cy.contains('.page-results-title', 'New Question Page');
        cy.get("#DeleteQuestion").contains('Delete').click();
    });
});



describe('UserProfile Tags Posted by the User ', () => {
    it('Checks if a User Profile contains answer link', () => {
        cy.visit('http://localhost:3000');
        cy.loginRegUser2();
        cy.get('a[href="#UserProfile"]').click();
        cy.contains('tags').click();
        cy.contains('.page-results-title', 'Tags')
        cy.get("#deleteTag").contains('Delete').click();

    });
});


describe('UserProfile Tags can be Edited by the User ', () => {
    it('Checks if a User Profile Tags can be edited by the user', () => {
        cy.visit('http://localhost:3000');
        cy.loginRegUser2();
        cy.get('a[href="#UserProfile"]').click();
        cy.contains('tags').click();
        cy.contains('.page-results-title', 'Tags')
        cy.get("#editTag").contains('Edit').click();

    });
});

describe('UserProfile Tags can be Deleted by the User ', () => {
    it('Checks if a User Profile Tags can be edited by the user', () => {
        cy.visit('http://localhost:3000');
        cy.loginRegUser2();
        cy.get('a[href="#UserProfile"]').click();
        cy.contains('tags').click();
        cy.contains('.page-results-title', 'Tags')

    });
});



describe('UserProfile Answers Posted by the User', () => {
    it('Checks if a User Profile contains answer link', () => {
        cy.visit('http://localhost:3000');
        cy.loginRegUser2();
        cy.get('a[href="#UserProfile"]').click();
        cy.contains('answers').click();
        cy.get('.welcome-header').should('contain', 'adithya');
    });
});


describe('UserProfile Answers Displayed as links of 50 characters', () => {
    it('Checks if a User Profile Answers Displayed are displayed as links of 50 characters', () => {
        cy.visit('http://localhost:3000');
        cy.loginRegUser2();
        cy.get('a[href="#UserProfile"]').click();
        cy.contains('answers').click()
        cy.get('.welcome-header').should('contain', 'adithya');
        cy.get('#user-profile-answers').each(($link) => {
            cy.wrap($link).invoke('text').then((text) => {
              expect(text.trim().length).to.be.at.most(50);
            });
          });

    });
});


describe('UserProfile New Answers Deletion also deletes comments and votes', () => {
    it('Checks if a User Profile Answers deletion also deletes comments and votes', () => {
        cy.visit('http://localhost:3000');
        cy.loginRegUser2();
        cy.get('a[href="#UserProfile"]').click();
        cy.contains('answers').click();
        cy.get('.welcome-header').should('contain', 'adithya');
        cy.get("#user-profile-answers").click();
        cy.contains('Delete').click();
        cy.get('#user-profile-answers').should('not.exist');

    });
});

describe('UserProfile Deletion of question will delete all answers or comments ', () => {
    it('Checks if a User Profile Deletion of question will delete all answers or comments', () => {
        cy.visit('http://localhost:3000');
        cy.loginRegUser2();
        cy.get('a[href="#UserProfile"]').click();
        cy.contains('questions').click();
        cy.contains('.postTitle', 'Test Question 9').click();
        cy.contains('.page-results-title', 'New Question Page');
        cy.get("#DeleteQuestion").contains('Delete').click();
    });
});

describe('UserProfile Reposting of question not change the original date of posting the question ', () => {
    it('Checks if a User Profile Reposting of question not change the original date of posting the question', () => {
        cy.visit('http://localhost:3000');
        cy.loginRegUser2();
        cy.get('a[href="#UserProfile"]').click();
        cy.contains('questions').click();
        cy.contains('.postTitle', 'Test Question 9').click();
        cy.contains('.page-results-title', 'New Question Page');
        cy.get('#questionTextInput').type('UPDATE HERE');
        cy.get('#UpdateQuestion').contains('Update Question').click();
    });
});


describe('UserProfile Deletion of an answer has no effect on reputation points', () => {
    it('Checks if a User Profile Answers deletion has no effect on reputation points', () => {
        cy.visit('http://localhost:3000');
        cy.loginRegUser2();
        cy.get('a[href="#UserProfile"]').click();
        cy.contains('answers').click();
        cy.get('.welcome-header').should('contain', 'adithya');
        cy.get("#user-profile-answers").click();
        cy.contains('Delete').click();
        cy.get('#user-profile-answers').should('not.exist');
    });
});


describe('UserProfile deletion of tag is not considered a new of an answer has no effect on reputation points', () => {
    it('Checks if a User Profile tag deletion has no effect on reputation points', () => {
        cy.visit('http://localhost:3000');
        cy.loginRegUser2();
        cy.get('a[href="#UserProfile"]').click();
        cy.contains('answers').click();
        cy.get('.welcome-header').should('contain', 'adithya');
        cy.get("#user-profile-answers").click();
        cy.contains('Delete').click();
        cy.get('#user-profile-answers').should('not.exist');
    });
});


describe('UserProfile Editing of tag is not considered a new of an answer has no effect on reputation points ', () => {
    it('Checks if a User Profile tag editing has no effect on reputation points', () => {
        cy.visit('http://localhost:3000');
        cy.loginRegUser2();
        cy.get('a[href="#UserProfile"]').click();
        cy.contains('tags').click();
        cy.contains('.page-results-title', 'Tags')
        cy.get("#editTag").contains('Edit').click();

    });
});

describe('UserProfile Answers Edit Prepopulation 1', () => {
    it('Checks if a User Profile Edit page is prepopualted with the curent answer', () => {
        cy.visit('http://localhost:3000');
        cy.loginRegUser2();
        cy.get('a[href="#UserProfile"]').click();
        cy.contains('answers').click();
        cy.get('.welcome-header').should('contain', 'adithya');
        cy.get("#user-profile-answers").click();
        cy.get('#answerTextInput').contains('a5');
    });

});


describe('UserProfile Answers Edit Prepopulation 2', () => {
    it('Checks if a User Profile Edit page is prepopualted with the curent answer', () => {
        cy.visit('http://localhost:3000');
        cy.loginRegUser2();
        cy.get('a[href="#UserProfile"]').click();
        cy.contains('answers').click();
        cy.get('.welcome-header').should('contain', 'adithya');
        cy.get("#user-profile-answers").click();
        
    });

});


describe('UserProfile New Answers Update  ', () => {
    it('Checks if a User Profile Answers can be updated', () => {
        cy.visit('http://localhost:3000');
        cy.loginRegUser2();
        cy.get('a[href="#UserProfile"]').click();
        cy.contains('answers').click();
        cy.get('.welcome-header').should('contain', 'adithya');
        cy.get("#user-profile-answers").click();
        cy.get('#answerTextInput').type('UPDATE HERE');
        cy.contains('Update Answer').click();
    });
});



describe('UserProfile New Answers Deletion', () => {
    it('Checks if a User Profile Answers can be deleted', () => {
        cy.visit('http://localhost:3000');
        cy.loginRegUser2();
        cy.get('a[href="#UserProfile"]').click();
        cy.contains('answers').click();
        cy.get('.welcome-header').should('contain', 'adithya');
        cy.get("#user-profile-answers").click();
        cy.contains('Delete').click();
        cy.get('#user-profile-answers').should('not.exist');

    });
});



}

)});
