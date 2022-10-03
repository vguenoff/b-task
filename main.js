import './style.scss'

const searchInput = document.getElementById('searchInput')
const movies = document.querySelector('.movies')
const noResults = document.querySelector('.no-results')

const upperCaseRobot = string =>
    string?.toLowerCase().replaceAll('robot', 'ROBOT')

async function fetchShowData(name) {
    try {
        const res = await fetch(`https://api.tvmaze.com/search/shows?q=${name}`)
        const data = await res.json()

        return data
            .filter(({ show }) => !show.name.toLowerCase().includes('show'))
            .map(data => {
                const { show } = data
                const updatedShow = {
                    ...show,
                    name: upperCaseRobot(show.name),
                    summary: upperCaseRobot(show.summary),
                }

                return {
                    data,
                    ...updatedShow,
                }
            })
    } catch (error) {
        console.error(error)
    }
}

async function displayMatches() {
    const showData = await fetchShowData(this.value)

    if (this.value.length > 0 && showData.length === 0) {
        noResults.classList.remove('hidden')
    } else {
        noResults.classList.add('hidden')
    }

    movies.innerHTML = showData
        ?.map(
            ({ name, image, rating, summary, genres }) =>
                ` <li>
                    ${
                        image
                            ? `<img src=${image?.medium} alt=${name}/>`
                            : `<div class="img-placeholder"></div>`
                    }
                    <h2 class="name">${name}</h2>
                    ${
                        rating.average
                            ? `<p class="rating"><strong>Rating: </strong>${rating.average} stars</p>`
                            : `<p>Unrated</p>`
                    }
                    ${
                        genres &&
                        `<p class="genres">${String(genres)
                            .split(',')
                            .join(', ')}</p>`
                    }
                    ${summary ? `<p>${summary}</p>` : `<p>No summary</p>`}
                </li>
            `,
        )
        .join('')
}

searchInput.addEventListener('keyup', displayMatches)
