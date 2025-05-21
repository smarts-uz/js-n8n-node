import { INodeType, INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';

export class KomolNode implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Komol Node',
		name: 'komolNode',
		icon: 'file:KomolNode.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Get data from NASAs API',
		defaults: {
			name: 'Komol Node',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'NasaPicsApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.nasa.gov',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Astronomy Picture of the Day',
						value: 'astronomyPictureOfTheDay',
					},
					{
						name: 'Mars Rover Photo',
						value: 'marsRoverPhoto',
					},
				],
				default: 'astronomyPictureOfTheDay',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'astronomyPictureOfTheDay',
						],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						action: 'Get the APOD',
						description: 'Get the Astronomy Picture of the day',
						routing: {
							request: {
								method: 'GET',
								url: '/planetary/apod',
							},
						},
					},
				],
				default: 'get',
			},
			{
				displayName: 'Operation',
				name: 'marsRoverOperation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'marsRoverPhoto',
						],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						action: 'Get Mars Rover photo',
						description: 'Get photo from the Mars Rover',
						routing: {
							request: {
								method: 'GET',
								url: '/mars-photos/api/v1/rovers/{{$parameter.roverName}}/photos',
							},
						},
					},
				],
				default: 'get',
			},
			{
				displayName: 'Rover Name',
				description: 'Choose which Mars Rover to get a photo from',
				required: true,
				name: 'roverName',
				type: 'options',
				options: [
					{ name: 'Curiosity', value: 'curiosity' },
					{ name: 'Opportunity', value: 'opportunity' },
					{ name: 'Perseverance', value: 'perseverance' },
					{ name: 'Spirit', value: 'spirit' },
				],
				default: 'curiosity',
				displayOptions: {
					show: {
						resource: [
							'marsRoverPhoto',
						],
					},
				},
			},
			{
				displayName: 'Date',
				description: 'Earth date',
				required: true,
				name: 'marsRoverDate',
				type: 'dateTime',
				default: '',
				displayOptions: {
					show: {
						resource: [
							'marsRoverPhoto',
						],
					},
				},
				routing: {
					request: {
						qs: {
							earth_date: '={{ new Date($value).toISOString().substr(0,10) }}',
						},
					},
				},
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				default: {},
				placeholder: 'Add Field',
				displayOptions: {
					show: {
						resource: [
							'astronomyPictureOfTheDay',
						],
						operation: [
							'get',
						],
					},
				},
				options: [
					{
						displayName: 'Date',
						name: 'apodDate',
						type: 'dateTime',
						default: '',
						routing: {
							request: {
								qs: {
									date: '={{ new Date($value).toISOString().substr(0,10) }}',
								},
							},
						},
					},
				],
			},
		],
	};
}
