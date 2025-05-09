import { Select } from '@radix-ui/themes'
import React from 'react'

const AssigneeSelect = () => {
  return (
    <Select.Root>
	<Select.Trigger placeholder='Assign a User'/>
	<Select.Content>
		<Select.Group>
			<Select.Label>Users</Select.Label>
			<Select.Item value="Sai">Sai</Select.Item>
			<Select.Item value="Tom">Tom</Select.Item>
		</Select.Group>
	
	</Select.Content>
</Select.Root>
  )
}

export default AssigneeSelect