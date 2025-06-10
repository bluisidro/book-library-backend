<div align="center">
<h3 align="center">Book Library - Backend</h3>

  <p align="center">
    A book library API
    <br />
    <a href="https://documenter.getpostman.com/view/1771507/2sB2qi7HAg"><strong>Explore the rest api docs »</strong></a><br />
    <a href="docs/index.html"><strong>Explore the js docs »</strong></a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#core-technologies">Core Technologies</a></li>
        <li><a href="#other-technologies">Other Technologies</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#running-the-project">Running the project</a></li>
      </ul>
    </li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)


A book library API to power a book club.

# Core technologies
* docker
* postgres
* NodeJS
* Typescript
* Fastify.

# Other technologies
* jest for unit test
* github action for running tests
* nginx for load balancing between 3 instance of the nodejs server


<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Getting Started

### Prerequisites
In order to run the project locally, you will need the following.
* [https://www.docker.com/](docker) - (if you don't know what to install you can try docker-desktop so you'll have a GUI)
* internet connection

## Running the project

### for linux and mac users
  * open terminal
  * navigate to the project directory
  * enter in terminal ```./start.sh```
    * if execution fail, you might want to provide execute permission using ```chmod +x start.sh```


### on windows
 * double click start.bat

wait for a couple of minutes for the build to finish <br/>
below is a screenshot of docker-desktop after running the commands.

[![Product Name Screen Shot][docker-desktop-screenshot]](https://example.com)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[product-screenshot]: readmefiles/screenshot.png
[docker-desktop-screenshot]: readmefiles/docker-desktop.png