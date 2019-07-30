import React from 'react'
import { Note } from '../model/note'
import styled from './style/styled'
import { Box } from './box'
import { useSpring, animated as a } from 'react-spring'
import { usePrevious } from '../utils/use-previous'
import { useMeasure } from '../utils/use-measure'

const ListItem = Box.withComponent('li')
const Heading = Box.withComponent('h1')
const ListItemHeadline = Box.withComponent('h2')
const HeaderButton = styled.button`
  width: 100%;
  background-color: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`
const HeaderTime = Box.withComponent('time')

const Content = styled(a.div)`
  will-change: transform, opacity, height;
  overflow: hidden;
`

const NoteItem = ({
  note,
  active,
  onClick,
}: {
  note: Note
  active: boolean
  onClick: () => void
}) => {
  const previous = usePrevious(active)
  const [bind, { height: viewHeight }] = useMeasure<HTMLDivElement>()
  const { height, opacity } = useSpring({
    from: { height: 0, opacity: 0 },
    to: {
      height: active ? viewHeight : 0,
      opacity: active ? 1 : 0,
    },
    config: {
      mass: 1,
      tension: 400,
      friction: 35,
      clamp: true,
    },
  }) as { height: number; opacity: number }
  return (
    <ListItem
      py="2"
      mt="1"
      fontFamily="sans"
      css={{
        listStyle: 'none',
      }}
    >
      <HeaderButton css={{ borderBottom: '1px solid black' }} onClick={onClick}>
        <ListItemHeadline mb="1" mt="0" fontSize="4">
          {note.title}
        </ListItemHeadline>
        <HeaderTime fontSize="2">{new Date(note.createdAt).toLocaleString()}</HeaderTime>
      </HeaderButton>
      <Content style={{ opacity, height: active && previous === active ? 'auto' : height }}>
        <a.div {...bind}>{note.body}</a.div>
      </Content>
    </ListItem>
  )
}

const UnorderedList = Box.withComponent('ul')

export const Notes = ({ notes }: { notes: Note[] }) => {
  const [active, setActive] = React.useState<string>(notes[0] && notes[0].id)

  return (
    <Box maxWidth="1024px" mx="auto">
      <Heading fontFamily="sans" fontSize="6">
        Notes
      </Heading>
      <UnorderedList p="0">
        {notes.map(note => (
          <NoteItem
            key={note.id}
            note={note}
            active={active === note.id}
            onClick={() => setActive(note.id)}
          />
        ))}
      </UnorderedList>
    </Box>
  )
}
