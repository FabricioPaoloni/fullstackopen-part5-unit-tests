import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'

describe('<BlogForm /> tests', () => {
    test('the form calls the event handler it received as props with the right details when a new blog is created', async() => {

        const mockHandler = vi.fn()
        const user = userEvent.setup()

        render(<BlogForm handleCreateBlog={mockHandler} />)

        const titleInput = screen.getByLabelText('title:')
        const authorInput = screen.getByLabelText('author:')
        const urlInput = screen.getByLabelText('url:')
        const likesInput = screen.getByLabelText('likes:')
        const createBlogButton = screen.getByText('Create Blog')

        //emulate user inputs
        await user.type(titleInput, 'BlogForm test for exercise 5.16')
        await user.type(authorInput, 'Exercise 5.16')
        await user.type(urlInput, 'url.com/exercise/5.16')
        await user.type(likesInput, '516')

        await user.click(createBlogButton)

        expect(mockHandler.mock.calls).toHaveLength(1)
        expect(mockHandler.mock.calls[0][0].title).toBe('BlogForm test for exercise 5.16')
        expect(mockHandler.mock.calls[0][0].author).toBe('Exercise 5.16')
        expect(mockHandler.mock.calls[0][0].url).toBe('url.com/exercise/5.16')
        expect(mockHandler.mock.calls[0][0].likes).toBe('516')

    })
})