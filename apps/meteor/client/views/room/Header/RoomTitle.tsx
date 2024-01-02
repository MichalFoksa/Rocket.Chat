import type { IRoom } from '@rocket.chat/core-typings';
import { HeaderTitle, useDocumentTitle } from '@rocket.chat/ui-client';
import type { ReactElement } from 'react';
import React from 'react';

import HeaderIconWithRoom from './HeaderIconWithRoom';

type RoomTitleProps = {
	room: IRoom;
};

const RoomTitle = ({ room }: RoomTitleProps): ReactElement => {
	console.log("RoomTitle", "room", room);
	// useDocumentTitle(room.name, false);
	useDocumentTitle(room.name + (room.unread && room.unread > 0 ? ' (' + room.unread + ')' : ''), false);
	// useDocumentTitle( room.name + room.avatarETag, false);

	return (
		<>
			<HeaderIconWithRoom room={room} />
			<HeaderTitle is='h1'>{room.name}</HeaderTitle>
		</>
	);
};

export default RoomTitle;
