import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog /> component tests', () => {

    test('Blog displays title and author property but does not display url and likes', () => {
        const blog = {
            title: 'Blog component displays title property',
            author: 'Exercise 5.13',
            url: 'testingcomponent.com/5.13',
            likes: 513
        }

        render(<Blog blog={blog} />)

        const title = screen.getByText('Blog component displays title property', { exact: false })
        const author = screen.getByText('Exercise 5.13', { exact: false })
        const url = screen.queryByText('testingcomponent.com/5.13', { exact: false })
        const likes = screen.queryByText('513', { exact: false })
        expect(title).toBeDefined()
        expect(author).toBeDefined()
        expect(url).toBeNull()
        expect(likes).toBeNull()

    })

    test('blog\'s URL and number of likes are shown when the button controlling the shown details has been clicked', async () => {
        //used to emulate a blog in the database for testing purpose
        const blog = {
            title: 'blog\'s URL and number of likes are shown when the button controlling the shown details has been clicked',
            author: 'Exercise 5.14',
            url: 'testingcomponent.com/5.14',
            likes: 514,
            user: {
                id: 'someid',
                name: 'test-5.14',
                username: 'testing'
            }
        }
        //used to emulate a loggedUser in the app for testing purpose, otherwise test fails because of Blog component's definition
        const loggedUser = blog.user 

        render(<Blog blog={blog} loggedUser={loggedUser} />)

        const user = userEvent.setup()
        const button = screen.getByText('view')
        await user.click(button)

        const url = screen.queryByText('url: testingcomponent.com/5.14', { exact: false })
        const likes = screen.queryByText('likes 514', { exact: false })
        expect(url).toBeDefined()
        expect(likes).toBeDefined()

    })

    test('if the like button is clicked twice, the event handler the component received as props is called twice', async () => {
        //used to emulate a blog in the database for testing purpose
        const blog = {
            title: 'if the like button is clicked twice, the event handler the component received as props is called twice',
            author: 'Exercise 5.15',
            url: 'testingcomponent.com/5.15',
            likes: 515,
            user: {
                id: 'someid',
                name: 'test-5.15',
                username: 'testing'
            }
        }
        //used to emulate a loggedUser in the app for testing purpose, otherwise test fails because of Blog component's definition
        const loggedUser = blog.user 
        //mockHandler function is going to emulate handleLike function
        const mockHandler = vi.fn()

        render(<Blog blog={blog} loggedUser={loggedUser} handleLike={mockHandler} />)

        const user = userEvent.setup()
        //app must render the hidden content
        const viewButton = screen.getByText('view')
        await user.click(viewButton)
        //now we can click the like button

        const likeButton = screen.getByText('like')
        await user.click(likeButton)
        await user.click(likeButton)

        expect(mockHandler.mock.calls).toHaveLength(2)

    })

})
