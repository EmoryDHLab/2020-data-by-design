//Generates a template .env file
const fileString = pass =>
`API_PORT=3000

# Configure only in a development environment
DEVELOPMENT_DB=data-by-design
TEST_DB=test-dxd

# Configure on a production server
PRODUCTION_DB=dxd_production
PROD_USER=dxd_admin
PROD_PASSWORD=${pass}
`;

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const fs = require('fs');
if (fs.existsSync('.env')) {
   console.log(".env file already exists! If you'd like to generate a new one, delete that one first.");
   process.exit();
}

readline.question(`Production database password: (or just press enter and input it later)`, (pass) => {
  readline.close()
  console.log();

  fs.writeFile('.env', fileString(pass), function (err) {
    if (err) {
      return console.log(err);
    }
    console.log('.env file written.');
  });
})



